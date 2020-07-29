
  //Fonction de sauvegarde du jardin pdf: 
//   const sauvegardepdf = (() => {
//   var doc = new jsPDF();          
//   var elementHandler = {
//     '#ignorePDF': function (element, renderer) {
//       return true;
//     }
//   };
//   var source = window.document.getElementById("grilleDeJardin");
//   console.log (source);
//   doc.fromHTML(
//       source,
//       15,
//       15,
//       {
//         'width': 180,'elementHandlers': elementHandler
//       });
  
//   doc.output("dataurlnewwindow");
// });

// const sauvegardepdf = (() => {
// $.ajax({
//   url: 'monJardin (12).json',
//   success: function(data) {
//     var blob=new Blob([data]);
//     var link=document.createElement('a');
//     link.href=window.URL.createObjectURL(blob);
//     link.download="monJardin.pdf";
//     link.click();
//   }
// });});
  // const sauvegardepdf = (() => {
  //   const doc = new jsPDF();
  //   const elementHTML = $('#creationTable').html();
  //   const specialElementHandlers = {
  //     '#editor': function (element, renderer) {
  //       return true;
  //     }
  //   };

  //   // $('#lienpdf').click(function () {
  //     doc.fromHTML(elementHTML, 15, 15, {
  //       'width': 170,
  //       'elementHandlers': specialElementHandlers}, {
  //       // doc.html($('#creationTable').html()), 
  //       callback: function (doc) {
  //         doc.save();
  //       }
  //     });
  //     // doc.save('monJardin.pdf')
  //     // ;});
  //   });
  //   // const data =  document.getElementById("grilleDeJardin");  
  //   // const file = new File([data], { type: "application/pdf" });
  //   // const blob = new Blob([data], { type: "text/xml" });
  //   // const url = URL.createObjectURL(file);
  //   // const lienpdf = document.getElementById('lienpdf');
  //   // lienpdf.setAttribute('download', "monJardin.pdf");
  //   // lienpdf.setAttribute('href', url);

//Fonction de sauvegarde pdf du jardin: 
// const savePdf = (() => {
//   const data = $("#creationJardin").html();
//   const blob = new Blob([data], { type: "text/xml" });
//   // const pdf = blob.stream();
//   const url = URL.createObjectURL(blob);

//   const lien = $('#lienpdf'); 
//   lien.attr('href', url);
// });



// $("#lienpdf").on('click', () => savePdf());
// 
  


    // $("#lienpdf").on('click', () => savePdf());

