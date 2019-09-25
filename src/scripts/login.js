(() => {
    // add active class 
    const handleFocus = (e) => {
      const target = e.target;
      target.parentNode.classList.add('active');
    };
    // remove active class
    const handleBlur = (e) => {
      const target = e.target;
      if(!target.value) {
        target.parentNode.classList.remove('active');
      }
    };  
    // register events
    const bindEvents = (element) => {
      const floatField = element.querySelector('input');
      floatField.addEventListener('focus', handleFocus);
      floatField.addEventListener('blur', handleBlur);    
    };
    
    // get DOM elements
   (() => {
      const floatContainers = document.querySelectorAll('.inputContainer');
      floatContainers.forEach((element) => {
        bindEvents(element);
      });
    })();
  })();
  

  