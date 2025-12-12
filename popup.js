document.getElementById('fillBtn').addEventListener('click', async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    try {
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: autofillForm
      });
      
      showStatus('Form filled successfully!', 'success');
    } catch (error) {
      showStatus('Error: ' + error.message, 'error');
    }
  });
  
  function showStatus(message, type) {
    const status = document.getElementById('status');
    status.textContent = message;
    status.className = type;
    status.style.display = 'block';
    
    setTimeout(() => {
      status.style.display = 'none';
    }, 3000);
  }
  
  function autofillForm() {
    const scripts = Array.from(document.querySelectorAll("script[src]")).map(s => s.src);
    const hasSplit = scripts.some(src => src.includes("coresplitnamev5"));
    const hasFull = scripts.some(src => src.includes("corefullnamev5"));
    
    console.log("Detected coresplitnamev5:* →", hasSplit);
    console.log("Detected corefullnamev5:* →", hasFull);
  
    const form = document.querySelector('#__vtigerWebForm_top');
    if (!form) {
      console.warn("Form #__vtigerWebForm_top not found.");
      alert("Form not found on this page!");
      return;
    }
  
    if (hasSplit) {
      console.log("Split-name mode detected.");
      const firstname = form.querySelector('input[name="firstname"]');
      const lastname = form.querySelector('input[name="lastname"]');
      const mobile = form.querySelector('input[name="mobile"]');
      const email = form.querySelector('input[name="email"]');
      
      if (firstname) firstname.value = "NBIT";
      if (lastname) lastname.value = "TEST";
      if (mobile) mobile.value = "0987654321";
      if (email) email.value = "nbit@theneighbors.co";
    } else if (hasFull) {
      console.log("Full-name mode detected.");
      const fullnameField = form.querySelector('input[name="cf_858"]');
      if (fullnameField) {
        fullnameField.value = "NBIT TEST";
      } else {
        console.warn("Fullname field not found (input[name='cf_858'])");
      }
      
      const mobile = form.querySelector('input[name="mobile"]');
      const email = form.querySelector('input[name="email"]');
      if (mobile) mobile.value = "0987654321";
      if (email) email.value = "nbit@theneighbors.co";
    } else {
      console.warn("No corefullname or coresplit script detected. Autofill cancelled.");
      alert("No compatible script detected on this page!");
      return;
    }
  
    const budget = form.querySelector('select[name="cf_854"]');
    if (budget && budget.options.length >= 2) {
      budget.selectedIndex = 2;
    }
  
    const cb1 = form.querySelector('input[name="checkbox1"]');
    const cb2 = form.querySelector('input[name="checkbox2"]');
    if (cb1) cb1.checked = true;
    if (cb2) cb2.checked = false;
  
    console.log("Autofill completed successfully.");
    alert("Form filled successfully!");
  }