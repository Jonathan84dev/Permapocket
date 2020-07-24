const isotope = (() => {
    $.noConflict(); 



jQuery(document).ready(($) => {



     const $grid = $('.grid');

     $grid.isotope({

         itemSelector: '.grid-item',
         layoutMode: 'masonry',
         getSortData: {
             name: '.name',
             category: '[data-category]'
         }
     });



     $('.filter-button-group').on('click', 'button', function () {

         var filterValue = $(this).attr('data-filter');
         console.log(filterValue);
         $grid.isotope({
             filter: filterValue,
             sortBy: name
         });
     });

     // bind sort button click
     $('#sorts').on('click', 'button', function () {
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

});
