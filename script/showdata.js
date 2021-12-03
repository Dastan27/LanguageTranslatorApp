async function getLanguages() {
    let res = await fetch(`https://libretranslate.de/languages`);
    let data = await res.json();
    Languages(data);
  }
  getLanguages();
  
  function Languages(d) {
    let select_div = document.getElementById(`languages`);
    d.forEach((el) => {
      let opt = document.createElement(`option`);
      opt.value = el.code;
      opt.textContent = el.name;
      select_div.append(opt);
    });
  }
  
  function translate_to() {
    let val = document.getElementById(`languages`).value;
    localStorage.setItem(`lang`, JSON.stringify(val));
    return val;
  }
  
  function getInput() {
    let log = document.getElementById("inp-text");
    return log.value;
  }
  
  async function translate() {
    const res = await fetch("https://libretranslate.de/translate", {
      method: "POST",
      body: JSON.stringify({
        q: getInput(),
        source: "en",
        target: translate_to(),
      }),
      headers: { "Content-Type": "application/json" },
    });
  
    let data = await res.json();
    let { translatedText } = data;
    appendresult(translatedText);
  }
  
  function showOutput() {
    translate();
  }
  
  function appendresult(data) {
    let translated_data = document.getElementById(`out-text`);
    translated_data.value = data;
  }