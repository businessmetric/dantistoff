
document.addEventListener('DOMContentLoaded', async function() {
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
    if (referer && (referer.includes('ya.ru') || referer.includes('yandex') || referer.includes('google')) && !utmSourceParam) {
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
    } else if ((referer && ownDomain === true) || (!referer && !utmSourceParam && !parseCookieValue(document.cookie, 'utm_source'))) {
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
});
