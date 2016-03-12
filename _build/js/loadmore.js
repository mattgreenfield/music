// Polyfill for .remove()
if (!('remove' in Element.prototype)) {
    Element.prototype.remove = function() {
        if (this.parentNode) {
            this.parentNode.removeChild(this);
        }
    };
}

const $button = $('button');
var postURLs;

function loadMore(amount){

    const postsToLoad = amount;
    var currentPosts = amount;

    // Load the JSON file containing all URLs
    $.getJSON('/all-posts.json', function(data) {
        postURLs = data["posts"];

        // console.log(postURLs);

        // If there aren't any more posts available to load than already visible, disable fetching
        if (postURLs.length <= 0){
            $button.remove();
        }
    });


    $button.click(function(){

        // Exit if postURLs haven't been loaded
        if (!postURLs) return;

        for (i = currentPosts; i < currentPosts + postsToLoad; i++) {

            $('.inner-constraint .grid').append(postSummary());
            currentPosts++
        }

        // If there aren't any more posts available to load than already visible, disable fetching
        if (currentPosts >= postURLs.length){
            $button.remove();
        }
    });
};
