// first_source

function _extends() {
    _extends = Object.assign
        ? Object.assign.bind()
        : function (target) {
              for (var i = 1; i < arguments.length; i++) {
                  var source = arguments[i];
                  for (var key in source) {
                      if (Object.prototype.hasOwnProperty.call(source, key)) {
                          target[key] = source[key];
                      }
                  }
              }
              return target;
          };
    return _extends.apply(this, arguments);
}

/**
 * Original script is created by Lunametrics
 * https://www.lunametrics.com/labs/recipes/utmz-cookie-replicator-for-gtm/
 * Modified by Analytics Mania https://www.analyticsmania.com/
 * Modified by EdwardK (telegram @Kalihman)
 *
 * Data is stored in the __initialTrafficSource cookie in the following format; brackets
 * indicate optional data and are aexcluded from the stored string:
 *
 * utmcsr=SOURCE|utmcmd=MEDIUM[|utmccn=CAMPAIGN][|utmcct=CONTENT]
 * [|utmctr=TERM/KEYWORD]
 *
 * e.g.:
 * utmcsr=example.com|utmcmd=affl-link|utmccn=foo|utmcct=bar|utmctr=biz
 */
(function (document) {
    /*
     * ==============
     * Main logic
     * ==============
     * */
    var referrer = document.referrer;
    var thisHostname = document.location.hostname;
    var thisDomain = getDomain_(thisHostname);
    var referringDomain = getDomain_(document.referrer);
    var sessionCookie = getCookie_('__utmzzses');
    var cookieExpiration = new Date(+new Date() + 1000 * 60 * 60 * 24 * 30 * 24);
    var qs = document.location.search.replace('?', '');
    var hash = document.location.hash.replace('#', '');
    var gaParams = parseGoogleParams(qs + '#' + hash);
    var referringInfo = parseGaReferrer(referrer);
    var storedVals = getCookie_('__utmz') || getCookie_('__utmzz');
    var newCookieVals = [];
    /** Final object with default values */

    var gaReferral = {
        utmcsr: '(direct)',
        utmcmd: '(none)',
        utmccn: '(not set)',
        utmhostname: new URL(document.referrer || document.location.href).hostname,
    };
    /** map object for converting long utm names to short analogs (e.g. utm_source => utmcsr) */

    var keyMap = {
        utm_source: 'utmcsr',
        utm_medium: 'utmcmd',
        utm_campaign: 'utmccn',
        utm_content: 'utmcct',
        utm_term: 'utmctr',
        gclid: 'utmgclid',
        dclid: 'utmdclid',
    };
    var keyFilter = ['utmcsr', 'utmcmd', 'utmccn', 'utmcct', 'jrt', 'utmctr', 'utmhostname'];

    if (sessionCookie && referringDomain === thisDomain) {
        gaParams = null;
        referringInfo = null;
    } // if query_params contains signup // prime_partners / referral

   // if gaParams variable (query string from Google) contains utm values (at least source, gclid and dclid properties)
     if (gaParams && gaParams.utm_source ) {
        // map google long utm names to short (with values)
        for (var key in gaParams) {
            if (!gaParams[key]) continue;
            var keyName = keyMap[key];
            gaReferral[keyName] = gaParams[key];
        } // if gclid or dclid then source = google and medium = cpc or cpm (depends on utmgclid)

        
    } // else if document referrer contains utm values
    else if (referringInfo) {
        gaReferral.utmcsr = referringInfo.source;
        gaReferral.utmcmd = referringInfo.medium;

        if (referringInfo.term) {
            gaReferral.utmctr = referringInfo.term;
        }
    } // else if one of __utmz or__utmzz cookies exists and __utmzzses cookie exists and referring domain === this domain
    else if (storedVals) {
        // __utmz or __utmzz cookie will be parsed and stored into final cookie
        gaReferral = storedVals.split('|').reduce(function (sum, i) {
            var _extends2;

            var _i$split = i.split('='),
                cookieName = _i$split[0],
                cookieValue = _i$split[1];

            return _extends(
                {},
                sum,
                ((_extends2 = {}),
                (_extends2[cookieName.split('.').pop()] = cookieValue),
                _extends2)
            );
        }, {});
    } // parse final object and create cookie from it

    for (var _key in gaReferral) {
        if (typeof gaReferral[_key] !== 'undefined' && keyFilter.indexOf(_key) > -1) {
            newCookieVals.push(_key + '=' + gaReferral[_key]);
        }
    } // If cookie initialTrafficSource isn't exists, then write it

    if (!getCookie_('initialTrafficSource')) {
        writeCookie_(
            'initialTrafficSource',
            newCookieVals.join('|'),
            cookieExpiration,
            '/',
            thisDomain
        );
    } // always write __utmzzses cookie

    writeCookie_('__utmzzses', 1, null, '/', thisDomain);
    /*
     * ==============
     * Help functions
     * ==============
     * */

    /**
     * @param {String} str
     * @returns {(object|undefined)}
     */

   function parseGoogleParams(str) {
        var campaignParams = ['source', 'medium', 'campaign', 'term', 'content'];
        var regex = new RegExp(
            '(utm_(' + campaignParams.join('|') + ')|(d|g)clid)=.*?([^&#]*|$)',
            'gi'
        );
        var gaParams = str.match(regex);
        var paramsObj, vals, len, i;
        if (!gaParams) return;
        paramsObj = {};
        len = gaParams.length;

        for (i = 0; i < len; i++) {
            vals = gaParams[i].split('=');

            if (vals) {
                paramsObj[vals[0]] = vals[1];
            }
        }

        return paramsObj;
    }
   

    function parseGaReferrer(referrer) {
        if (!referrer) return;
        var searchEngines = {
            'daum.net': {
                p: 'q',
                n: 'daum',
            },
            'eniro.se': {
                p: 'search_word',
                n: 'eniro ',
            },
            'naver.com': {
                p: 'query',
                n: 'naver ',
            },
            'yahoo.com': {
                p: 'p',
                n: 'yahoo',
            },
            'msn.com': {
                p: 'q',
                n: 'msn',
            },
            'bing.com': {
                p: 'q',
                n: 'live',
            },
            'aol.com': {
                p: 'q',
                n: 'aol',
            },
            'lycos.com': {
                p: 'q',
                n: 'lycos',
            },
            'ask.com': {
                p: 'q',
                n: 'ask',
            },
            'altavista.com': {
                p: 'q',
                n: 'altavista',
            },
            'search.netscape.com': {
                p: 'query',
                n: 'netscape',
            },
            'cnn.com': {
                p: 'query',
                n: 'cnn',
            },
            'about.com': {
                p: 'terms',
                n: 'about',
            },
            'mamma.com': {
                p: 'query',
                n: 'mama',
            },
            'alltheweb.com': {
                p: 'q',
                n: 'alltheweb',
            },
            'voila.fr': {
                p: 'rdata',
                n: 'voila',
            },
            'search.virgilio.it': {
                p: 'qs',
                n: 'virgilio',
            },
            'baidu.com': {
                p: 'wd',
                n: 'baidu',
            },
            'alice.com': {
                p: 'qs',
                n: 'alice',
            },
            'yandex.com': {
                p: 'text',
                n: 'yandex',
            },

            'ya.ru': {
                p: 'text',
                n: 'yandex',
            },

            'yandex.ru': {
                p: 'text',
                n: 'yandex',
            },
            'najdi.org.mk': {
                p: 'q',
                n: 'najdi',
            },
            'seznam.cz': {
                p: 'q',
                n: 'seznam',
            },
            'search.com': {
                p: 'q',
                n: 'search',
            },
            'wp.pl': {
                p: 'szukaj ',
                n: 'wirtulana polska',
            },
            'online.onetcenter.org': {
                p: 'qt',
                n: 'o*net',
            },
            'szukacz.pl': {
                p: 'q',
                n: 'szukacz',
            },
            'yam.com': {
                p: 'k',
                n: 'yam',
            },
            'pchome.com': {
                p: 'q',
                n: 'pchome',
            },
            'kvasir.no': {
                p: 'q',
                n: 'kvasir',
            },
            'sesam.no': {
                p: 'q',
                n: 'sesam',
            },
            'ozu.es': {
                p: 'q',
                n: 'ozu ',
            },
            'terra.com': {
                p: 'query',
                n: 'terra',
            },
            'mynet.com': {
                p: 'q',
                n: 'mynet',
            },
            'ekolay.net': {
                p: 'q',
                n: 'ekolay',
            },
            'rambler.ru': {
                p: 'words',
                n: 'rambler',
            },
            google: {
                p: 'q',
                n: 'google',
            },
        };
        var a = document.createElement('a');
        var values = {};
        var searchEngine, termRegex, term;
        a.href = referrer; // Shim for the billion google search engines

        if (a.hostname.indexOf('google') > -1) {
            referringDomain = 'google';
        }

        if (searchEngines[referringDomain]) {
            searchEngine = searchEngines[referringDomain];
            termRegex = new RegExp(searchEngine.p + '=.*?([^&#]*|$)', 'gi');
            term = a.search.match(termRegex);
            values.source = searchEngine.n;
            values.medium = 'organic';
            values.term = (term ? term[0].split('=')[1] : '') || '(not provided)';
        } else if (referringDomain !== thisDomain) {
            values.source = a.hostname;
            values.medium = 'referral';
        }

        return values;
    }
    /**
     * @param name
     * @param value
     * @param [expiration]
     * @param [path]
     * @param [domain]
     * @returns {void}
     */

    function writeCookie_(name, value, expiration, path, domain) {
        var str = name + '=' + value + ';';
        if (expiration) str += 'Expires=' + expiration.toGMTString() + ';';
        if (path) str += 'Path=' + path + ';';
        if (domain) str += 'Domain=' + domain + ';';
        document.cookie = str;
    }
    /**
     * @param {string} name
     * @returns {(string|undefined)}
     */

    function getCookie_(name) {
        var cookies = '; ' + document.cookie;
        var cvals = cookies.split('; ' + name + '=');
        if (cvals.length > 1) return cvals.pop().split(';')[0];
    }
    /**
     * @param {string} url
     * @returns {(string|undefined)} domain
     */

    function getDomain_(url) {
        if (!url) return;
        var a = document.createElement('a');
        a.href = url;

        try {
            return a.hostname.match(/[^.]*\.[^.]{2,3}(?:\.[^.]{2,3})?$/)[0];
        } catch (squelch) {}
    }
})(document);

