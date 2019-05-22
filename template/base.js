page.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

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
