page.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
page.domain = document.location.hostname;
page.ext = {};
page.utils = {};

if (page.slug === 'home' && !page.isMobile) {
    const syncCards = function () {
        let map = $("#card-map"), company = $("#card-company");
        map.css('min-height', company.height());
    }
    
    window.onresize = function(event) {
        syncCards()
    };
    
    $(document).ready(function () {
        setTimeout(syncCards, 500);
        setTimeout(syncCards, 1600);
    });
}

page.utils.cookies = {
    get: function(name) {
      var value = '; ' + document.cookie;
      var parts = value.split('; ' + name + '=');
      return parts.length < 2
        ? undefined
        : parts
            .pop()
            .split(';')
            .shift();
    },

    set: function(name, value, expiryDays, domain, path, secure) {
      var exdate = new Date();
      exdate.setDate(exdate.getDate() + (expiryDays || 365));

      var cookie = [
        name + '=' + value,
        'expires=' + exdate.toUTCString(),
        'path=' + (path || '/')
      ];

      if (domain) {
        cookie.push('domain=' + domain);
      }
      if (secure) {
        cookie.push('secure');
      }
      document.cookie = cookie.join(';');
    }
};

page.ext.cookies = function () {
    const container = document.createElement("div");
    container.id = "dialog-cookies";
    container.className = "card bg-dark text-white";
    container.style.display = "block";
    container.style.position = "relative";
    container.style.borderRadius = 0;
    container.style.zIndex = 999;
    
    const link = document.createElement("a");
    link.href = page.impress;
    link.className = "text-white ml-2";
    link.innerText = "Weitere Informationen";
    
    const dismiss = document.createElement("a");
    dismiss.innerText = "Verstanden";
    dismiss.className = "float-right btn btn-outline-secondary";
    dismiss.style.position = "absolute";
    dismiss.style.right = "15px";
    dismiss.style.top = "13px";
    dismiss.onclick = function () {
        $("#dialog-cookies").hide(0);
        page.utils.cookies.set("acceptCookies", "true", 120, page.domain, null, false);
    };
    
    const body = document.createElement("div");
    body.className = "card-body";
    body.innerText = "Dieser Internet-Auftritt verwendet Cookies. ";
    body.appendChild(link);
    body.appendChild(dismiss);
    container.appendChild(body);
    
    document.body.prepend(container);
};

$(document).ready(function () {
    if(page.utils.cookies.get("acceptCookies") === undefined) {
        page.ext.cookies();
    }
});