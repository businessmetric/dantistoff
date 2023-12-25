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
