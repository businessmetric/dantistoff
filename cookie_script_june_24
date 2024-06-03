function firstSource() {
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


(function (document) {

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
}

function lastNonDirect() {
// lsn
// Получаем куки
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

// Доп. проверка на Direct
var params = new URLSearchParams(window.location.search);
 
  
// Проверяем текущий переход директ или нет
function isThisDirect() {
  // Список ключевых параметров в URL относящегося к Direct
        if(params.get('utmcsr') !== null &&
            (params.get('utmcsr') == 'direct' || params.get('utmcsr') == '')) return true;

 
        if(params.get('utm_source') !== null && 
           (params.get('utm_source') == 'direct' || params.get('utm_source') == '')) return true;   
  
        if(params.get('utm_medium') !== null && params.get('utm_medium') == '') return true;   
        if(params.get('utm_campaign') !== null && params.get('utm_campaign') == '') return true;    
  
        return false; 
}

// Устанавливаем куки в соответвии с источником запроса, и рядом прочих условий
function setSourceCookie() {
    // Собственный домен
    // перечисляем что такое собственные домены, чтобы вычислить прямые заходы
    var ownDomain = [
        'dantistoff.ru',
        'xn----7sbaff2adcyjnre9bt8byk.xn--80adxhks',
        'promo.dantistoff.ru'
    ];

    // Поисковые системы
    // перечисляем список доменов, которые относятся к поисковым системам типа Гугл поиск и Яндекс Поиск
    var searchEngines = [
      'daum.net',
      'eniro.se',
      'naver.com',
      'yahoo.com',
      'msn.com',
      'bing.com',
      'aol.com',
      'lycos.com',
      'ask.com',
      'altavista.com',
      'netscape.com',
      'cnn.com',
      'about.com',
      'mamma.com',
      'alltheweb.com',
      'voila.fr',
      'virgilio.it',
      'baidu.com',
      'alice.com',
      'yandex.com',
      'najdi.org.mk',
      'seznam.cz',
      'search.com',
      'wp.pl',
      'onetcenter.org',
      'szukacz.pl',
      'yam.com',
      'pchome.com',
      'kvasir.no',
      'sesam.no',
      'ozu.es',
      'terra.com',
      'mynet.com',
      'ekolay.net',
      'rambler.ru',
      'google.com',
      'yandex.ru',
      'ya.ru'
    ];

    // переменная котора кладется далее в href, чтобы его можно было парсить
    var a = document.createElement('a');
    // положили в href ТО что было у пользователя в document.referrer
    a.href = document.referrer;
    // захватываем из document.referrer полное значение hostname
    var fullDomain = a.hostname;
    // разбиваем на части полное имя хоста по точкам (поддомены, зоны и тд)
    var pieces = fullDomain.split(/[\s.]+/);
    // захватываем зону домена
    var zone = pieces[pieces.length - 1];
    // получаем только домен без поддомена
    var domain = pieces[pieces.length - 2];
    // получаем полное значение URL
    var sub_domain_name = new URL(document.referrer || document.location.href)
    // склейка зоны + домена без поддомена
    var domain_name = domain + '.' + zone;
    // прослушиваем query параметры , все после ?
    var query_params = document.location.search;
    // переменные для дальнейшего использования в поиске значений в query параметрах
    // переменные для записи куки
    var expirationTime = 31560000; // 12 months in seconds
    expirationTime = expirationTime * 1000; // Converts expirationtime to milliseconds

    var date = new Date();
    var dateTimeNow = date.getTime();
    date.setTime(dateTimeNow + expirationTime); // Sets expiration time (Time now + 12 month in seconds)

    var expirationTimeString = date.toUTCString(); // Converts milliseconds to UTC time string
    var expirationCookie = "; expires=" + expirationTimeString
    var cookieName = "last_utm_source"; // Name of your cookie

    var fullCookieValue = cookieName + "=direct; path=/; domain=." + location.hostname.replace(/^www\./i, "") + expirationCookie; // Sets cookie for all subdomains
   
    // не DIRECT
    // Условие, если в URL замечается текст "utm_source" или "utm_source", то мы с этими значениями записываем куки
    if (params.get('utm_source') != undefined || params.get('utm_medium') != undefined || params.get('utm_campaign') != undefined){
      var cookieValue = "utmcsr=" + params.get('utm_source') + "|" + "utmcmd=" + params.get('utm_medium') + "|" + "utmccn=" + params.get('utm_campaign') + "|" + "utmcct=" + params.get('utm_content') + "|" + "utmctr=" + params.get('utm_term') + "|" + "utmhostname=" + sub_domain_name; // Value of your cookie
      fullCookieValue = cookieName + "=" +cookieValue+"; path=/; domain=." + location.hostname.replace(/^www\./i, "") + expirationCookie; // Sets cookie for all subdomains      
    }

 
    // DIRECT
    // Условия, если домен первого уровня + зона соответствуют нашему домену domain_name то пишем следующие значения DIRECT
    /// else if this our domain then Direct
    else if (ownDomain.indexOf(domain_name) > -1) {
      var cookieValue = "utmcsr=" + 'direct' + "|" + "utmcmd=" + '(not set)' + "|" + "utmccn=" + '(not set)' + "|" + "utmcct=" + '(not set)' + "|" + "utmctr=" + '(not set)' + "|" + "utmhostname=" + sub_domain_name; // Value of your cookie
      fullCookieValue = cookieName + "=" +cookieValue+"; path=/; domain=." + location.hostname.replace(/^www\./i, "") + expirationCookie; // Sets cookie for all subdomains    
    }
 
    // не DIRECT
    // Условия , если домен первого уровня + зона соответствуют списку поисковых систем
    else if (searchEngines.indexOf(domain_name) > -1) {
      var cookieValue = "utmcsr=" + domain_name + "|" + "utmcmd=" + 'organic' + "|" + "utmcct=" + '(not set)' + "|" + "utmhostname=" + sub_domain_name; // Value of your cookie
      fullCookieValue = cookieName + "=" +cookieValue+"; path=/; domain=." + location.hostname.replace(/^www\./i, "") + expirationCookie; // Sets cookie for all subdomains

    // не DIRECT  
    // условия, если домен не подошел ни по одному из правил, значит записываем как переход с сайта
    } else {
      var cookieValue = "utmcsr=" + domain_name + "|" + "utmcmd=" + 'referral' + "|" + "utmcct=" + '(not set)' + "|" + "utmhostname=" + sub_domain_name; // Value of your cookie
      fullCookieValue = cookieName + "=" +cookieValue+"; path=/; domain=." + location.hostname.replace(/^www\./i, "") + expirationCookie; // Sets cookie for all subdomains  
    }

    var last_utm_source = getCookie(cookieName); // Последнее значение UTM метки добавленное в куки

    // (1) Если куки установлена, и это не директ, а текущий заход директ -  то не меняем куки
    if(last_utm_source != null 
       && last_utm_source 
       && last_utm_source.indexOf('utmcsr=direct') == -1      
       && (cookieValue.indexOf('utmcsr=direct') !== -1 || isThisDirect())) {

      return false;
    }

    // (2) Если в куке last_utm_source имеется utm_source=direct (то есть последний заход был прямой) + И этот данный переход тоже direct - мы НЕ запускаем скрипт.
    if(last_utm_source != null &&
       last_utm_source.indexOf('utmcsr=direct') !== -1 &&
       (cookieValue.indexOf('utmcsr=direct') !== -1 || isThisDirect())) {

      return false;
    }

    // (3) Если в куке last_utm_source имеется utm_source=direct (то есть последний заход был прямой) > НО этот переход не прямой (то есть НЕ direct)- Мы запускаем скрипт, чтобы перезаписать куки.
    if(last_utm_source != null &&
      last_utm_source.indexOf('utmcsr=direct') !== -1 &&
      (cookieValue.indexOf('utmcsr=direct') == -1 && isThisDirect() == false)) {
  document.cookie = fullCookieValue; // Сохраняем згачение UTM в куки

      return true;
    }

    // (4) Если в куке last_utm_source utm_source!=direct , то есть НЕ прямой > А этот данный переход direct, то есть прямой - мы НЕ запускаем скрипт
    if(last_utm_source != null &&
      last_utm_source.indexOf('utmcsr=direct') == -1 &&
      (cookieValue.indexOf('utmcsr=direct') !== -1 || isThisDirect())) {

      return false;
    }
    
    // (5) Если в куке last_utm_source utm_source!=direct , (то есть последний заход был НЕ прямой) > 
  // И этот переход не ПРЯМОЙ (то есть НЕ direct) - Мы запускаем скрипт, чтобы перезаписать куки.
    if((cookieValue.indexOf('utmcsr=direct') == -1 && isThisDirect() == false) && 
        last_utm_source != null && 
        last_utm_source &&  
      last_utm_source.indexOf('utmcsr=direct') == -1) {

      document.cookie = fullCookieValue; // Сохраняем згачение UTM в куки
      return true;
    }

    // Сохраняем згачение UTM в куки
    document.cookie = fullCookieValue;
}

setSourceCookie();
  
}

function utmParams() {
  
    const domain = window.location.hostname;
    setCookie('domain', domain);

    function ownDomainFunc(domain_from_referer) {
        var ownDomainArr = [
            'dantistoff.ru',
            'xn----7sbaff2adcyjnre9bt8byk.xn--80adxhks',
            'promo.dantistoff.ru',
            'files.click-app.ru'
        ];
        if (ownDomainArr.indexOf(domain_from_referer) > -1) {return true} else {return false}
    }
    // Функция для парсинга значения параметра запроса
    function getQueryParam(name) {
        const urlSearchParams = new URLSearchParams(window.location.search);
        return urlSearchParams.get(name);
    }

    // Функция для парсинга значения куки
    function parseCookieValue(cookie, key) {
        const match = cookie.match(new RegExp('(?:^|; )' + key + '=([^;]*)'));
        return match ? decodeURIComponent(match[1]) : null;
    }

    // Функция для установки куки
    function setCookie(name, value, days) {
        const expires = days ? '; expires=' + new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString() : '';
        document.cookie = name + '=' + value + expires + '; path=/; domain='+ domain;
    }

    // Получаем значения из куки и referer    
    const searchCookie = parseCookieValue(document.cookie, 'search');
    if (getQueryParam('utm_source') !== null) {var utmSourceParam = getQueryParam('utm_source');}
   
    
    const referer = document.referrer;
    if (referer) {
        let domainFromReferer = referer.match(/:\/\/(.[^/]+)/)[1];
        var ownDomain = ownDomainFunc(domainFromReferer)
        console.log('ownDomain: ' + ownDomain)
    }


    //Устанавливаем значения utM по дефолту
    let utm_source_param = '(not set)'
    let utm_med_param = '(not set)'
    let utm_camp_param = '(not set)'
    let utm_term_param = '(not set)'
    let utm_cont_param = '(not set)'

    if (getQueryParam('utm_source') !== null) utm_source_param = getQueryParam('utm_source')
    if (getQueryParam('utm_medium') !== null) utm_med_param = getQueryParam('utm_medium')
    if (getQueryParam('utm_campaign') !== null) utm_camp_param = getQueryParam('utm_campaign')
    if (getQueryParam('utm_term') !== null) utm_term_param = getQueryParam('utm_term')
    if (getQueryParam('utm_content') !== null) utm_cont_param = getQueryParam('utm_content')
  

    // Логика установки прочих кук!
    if (referer && ownDomain === false && (referer.includes('ya.ru') || referer.includes('yandex') || referer.includes('google')) && !utmSourceParam) {
        const domainFromReferer = referer.match(/:\/\/(.[^/]+)/)[1];
        const rkName = 'SEO';
        let search = 'yandex';
        if (referer.includes('google')) search = 'google';

        setCookie('rk_name', rkName, 365);
        setCookie('search', search, 365);
        setCookie('utm_source', search, 365);
        setCookie('utm_medium', 'organic', 365);
        setCookie('utm_campaign', '(not set)', 365);
        setCookie('utm_content', '(not set)', 365);
        setCookie('utm_term', '(not set)', 365);
        
    } else if (referer &&  ownDomain === false && !referer.includes('ya.ru') && !referer.includes('yandex') && !referer.includes('google') && !utmSourceParam) {
        const domainFromReferer = referer.match(/:\/\/(.[^/]+)/)[1];
        const rkName = domainFromReferer + ' / referrer';
        
        setCookie('rk_name', rkName, 365);
        setCookie('search', '(not set)', 365);
        setCookie('utm_source', domainFromReferer, 365);
        setCookie('utm_medium', '(not set)', 365);
        setCookie('utm_campaign', '(not set)', 365);
        setCookie('utm_content', '(not set)', 365);
        setCookie('utm_term', '(not set)', 365);
    } else if (utmSourceParam) {
        if (utmSourceParam === 'yandex') {
            const rkName = 'YandexCPC';
            const search = 'yandex';

            setCookie('rk_name', rkName, 365);
            setCookie('search', search, 365);
            setCookie('utm_source', 'yandex', 365);
            setCookie('utm_medium', utm_med_param, 365);
            setCookie('utm_campaign', utm_camp_param, 365);
            setCookie('utm_content', utm_cont_param, 365);
            setCookie('utm_term', utm_term_param, 365);

        } else if (utmSourceParam === 'youtube') {
            const rkName = 'YouTube';

            setCookie('rk_name', rkName, 365);
            setCookie('search', '(not set)', 365);
            setCookie('utm_source', 'youtube', 365);
            setCookie('utm_medium', utm_med_param, 365);
            setCookie('utm_campaign', utm_camp_param, 365);
            setCookie('utm_content', utm_cont_param, 365);
            setCookie('utm_term', utm_term_param, 365);
        } else if (utmSourceParam === '2gis') {
            const rkName = '2gis';
            console.log('2gis')

            setCookie('rk_name', rkName, 365);
            setCookie('search', '(not set)', 365);
            setCookie('utm_source', '2gis', 365);
            setCookie('utm_medium', utm_med_param, 365);
            setCookie('utm_campaign', utm_camp_param, 365);
            setCookie('utm_content', utm_cont_param, 365);
            setCookie('utm_term', utm_term_param, 365);
        } else if (utmSourceParam === 'yandex_map') {
            const rkName = 'YandexMap';
            const search = 'yandex';
            console.log('yaMap')

            setCookie('rk_name', rkName, 365);
            setCookie('search', search, 365);
            setCookie('utm_source', 'yandex_map', 365);
            setCookie('utm_medium', utm_med_param, 365);
            setCookie('utm_campaign', utm_camp_param, 365);
            setCookie('utm_content', utm_cont_param, 365);
            setCookie('utm_term', utm_term_param, 365);
        } else {
            const rkName = utm_source_param + ' / ' + utm_med_param;
            
            setCookie('rk_name', rkName, 365);
            setCookie('search', '(not set)', 365);
            setCookie('utm_source', utm_source_param, 365);
            setCookie('utm_medium', utm_med_param, 365);
            setCookie('utm_campaign', utm_camp_param, 365);
            setCookie('utm_content', utm_cont_param, 365);
            setCookie('utm_term', utm_term_param, 365);
        }
    } else if ((referer && ownDomain === false) || (!referer && !utmSourceParam && !parseCookieValue(document.cookie, 'utm_source'))) {
        setCookie('rk_name', 'direct', 365);
        setCookie('search', '(not set)', 365);
        setCookie('utm_source', '(not set)', 365);
        setCookie('utm_medium', '(not set)', 365);
        setCookie('utm_campaign', '(not set)', 365);
        setCookie('utm_content', '(not set)', 365);
        setCookie('utm_term', '(not set)', 365);
    } 

    const rkNameCookie = parseCookieValue(document.cookie, 'rk_name');
   
    // Логика установки куки first_rk_name
   
    let cookieExist = document.cookie.indexOf("first_rk_name")
    if (cookieExist <= 0 ) {
        setCookie('first_rk_name', rkNameCookie, 365); // 1 год
    }
}
firstSource()
lastNonDirect()
utmParams()
