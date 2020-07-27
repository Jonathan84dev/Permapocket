 // const importJson = (() => {
  // let jsonfile = (function() {
  //   let jsonfile = null;
  //   $.ajax({
  //     'async': false,
  //     'global': false,
  //     'url': "http://D:/cours%20webforce/Front/TEST%20PERMAPOCKET/monJardin(12).json",
  //     'dataType': "json",
  //     'success': function(data) {
  //       jsonfile = data;
  //     }
  //   });
  //   // return jsonfile;
  //   console.log(jsonfile);
  // })();})

// const importJson = (() => {
//       jQuery.getJSON('monJardin(12).json',function(data){
//         jQuery.each(data,function(index,d){
//           console.log(d);
//            d= JSON.parse(data);
//           console.log(d.a);
//           $('#creationTable').append(d.a);
      
//         });
//       });
//     });  

//     const importJson = (() => {
//     let request = new XMLHttpRequest();
// request.overrideMimeType("application/json");
// request.open('GET', 'monJardin(12).json', true);
// request.onreadystatechange = function () {
// if (request.readyState == 4 && request.status == "200") {               
//     let json = JSON.parse(request.responseText);
//     console.log(json);
//     }
// };
// request.send(null);
// });  


// function doJSONP(result) {
//   console.log(result.data);
// }

// let script = document.createElement('script');
// script.src = 'https://api.github.com/users/impressivewebs?callback=doJSONP'

// document.getElementsByTagName('body')[0].appendChild(script);
// const importJson = (() => {
// $.getJSON('monJardin(12).json', (result) => {
//   console.log(result);
// });});
  // document.getElementById('importJson').addEventListener('click', () => importJson());
// $("#importJson").on('click', () => importJson());


