!(function (e) {
   const i = (e.af = e.af || {});
   (i.dictionary = Object.assign(i.dictionary || {}, {
      'Block quote': 'Blok-aanhaling',
      Bold: 'Vetgedruk',
      Cancel: 'Kanselleer',
      'Cannot upload file:': 'Lêer nie opgelaai nie:',
      'Could not insert image at the current position.':
         'Beeld kan nie in die posisie toegevoeg word nie.',
      'Could not obtain resized image URL.': '',
      'Insert image or file': 'Voeg beeld of lêer in',
      'Inserting image failed': '',
      Italic: 'Skuinsgedruk',
      Save: 'Berg',
      'Selecting resized image failed': '',
   })),
      (i.getPluralForm = function (e) {
         return 1 != e;
      });
})(window.CKEDITOR_TRANSLATIONS || (window.CKEDITOR_TRANSLATIONS = {}));
