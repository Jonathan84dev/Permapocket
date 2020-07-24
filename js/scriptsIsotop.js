$.noConflict();
jQuery(document).ready(($) => {

   $('.grid').isotope({
        itemSelector: '.grid-item',
        layoutMode: 'masonry',
        getSortData: {
            name: '.name'
        }
    });

    const $grid = $('.grid').isotope();


    $('.filter-button-group').on('click', 'button', function () {
        var filterValue = $(this).attr('data-filter');
        console.log(filterValue);
        $grid.isotope({
            filter: filterValue,
            sortBy: name
        });
    });

  // bind sort button click
   $('#sorts').on( 'click', 'button', function() {
     var sortByValue = $(this).attr('data-sort-by');
     console.log(sortByValue);
     $grid.isotope({ sortBy: sortByValue });
   });

    // change is-checked class on buttons
    $('.button-group').each(function (i, buttonGroup) {
        var $buttonGroup = $(buttonGroup);
        $buttonGroup.on('click', 'button', function () {
            $buttonGroup.find('.is-checked').removeClass('is-checked');
            $(this).addClass('is-checked');
        });
    });
});
