(() => {
    fetch("./server/banners/index.get.json")
        .then(response => response.json())
        .then(response => generateSliderHTML(response))
        .catch(function () {
            console.log("error");
        });
})();
window.addEventListener("onhashchange ", (e) => {
    debugger;
    console.log("ergfjk")
});
const generateSliderHTML = (data) => {
    var sliderNode = document.getElementById("home-section");
    var theTemplateScript = document.getElementById("slider-template").innerHTML;;
    var template = Handlebars.compile(theTemplateScript);
    sliderNode.innerHTML = template(data);
    sliderNode.dispatchEvent(new Event("hashchange"));
    var selectionFired = new CustomEvent("hashchange");

    document.dispatchEvent(selectionFired);
    
};
const loadLoginForm= () =>{
    console.log("login");
/*  window.location.hash = 'login/'; */
}
document.addEventListener('hashchange', () => {
    render(decodeURI(window.location.hash));
});

function render(url) {

    // Get the keyword from the url.
    var temp = url.split('/')[0];

    // Hide whatever page is currently shown.
   document.getElementsByClassName('page').removeClass('visible');


    var	map = {

        // The "Homepage".
        '': function() {

            

            renderProductsPage(products);
        },

        // Single Products page.
        '#product': function() {

            // Get the index of which product we want to show and call the appropriate function.
            var index = url.split('#product/')[1].trim();

            renderSingleProductPage(index, products);
        },

        // Page with filtered products
        '#filter': function() {

            // Grab the string after the '#filter/' keyword. Call the filtering function.
            url = url.split('#filter/')[1].trim();

            // Try and parse the filters object from the query string.
            try {
                filters = JSON.parse(url);
            }
                // If it isn't a valid json, go back to homepage ( the rest of the code won't be executed ).
            catch(err) {
                window.location.hash = '#';
                return;
            }

            renderFilterResults(filters, products);
        }

    };

    // Execute the needed function depending on the url keyword (stored in temp).
    if(map[temp]){
        map[temp]();
    }
    // If the keyword isn't listed in the above - render the error page.
    else {
        renderErrorPage();
    }

}