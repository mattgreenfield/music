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
var baseurl = "/";

function loadMore(amount, baseurl){

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

    function postSummary(){
        return '<li class="grid__item">'
                    + '<section class="post-summary" data-type="'+ postURLs[i].type +'">'
                        + '<div class="post-summary__image">'
                            + '<img src="'+ baseurl +'/assets/images/posts/' + postURLs[i].image + '" alt="">'
                        + '</div>'
                        + '<div class="post-summary__text">'
                            + '<ul class="reset-list list--inline breadcrumb post-summary__breadcrumb">'
                                + '<li class="breadcrumb__item">'
                                    + '<a href="'+ baseurl +'/blog/">Blog</a>'
                                + '</li>'
                                + '<li class="breadcrumb__item">'
                                    + '<a href="'+ baseurl +'/blog/'+ postURLs[i].type +'s.html">'+ postURLs[i].type +'</a>'
                                + '</li>'
                                + '<li class="breadcrumb__item">'
                                    + '<p>'+ postURLs[i].artist +'</p>'
                                + '</li>'
                            + '</ul>'
                            + '<h1 class="heading heading--epsilon">'
                                + '<a href="'+ postURLs[i].url +'">'+ postURLs[i].title +'</a>'
                            + '</h1>'
                            + '<div class="post-summary__excerpt">'+ postURLs[i].excerpt +'</div>'
                            + '<span class="post-summary__author">'+ postURLs[i].authorname +',</span>'
                            + '<span class="post-summary__date">'+ postURLs[i].date +'</span>'
                            + '<a class="post-summary__more" href="'+ postURLs[i].url +'">Read More</a>'
                        + '</div>'
                    + '</section>'
                + '</li>';
    }
};
