(() => {
  'use strict';
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const store = {
    get(key, fallback) { try { const value = localStorage.getItem(`jannah-${key}`); return value === null ? fallback : JSON.parse(value); } catch { return fallback; } },
    set(key, value) { try { localStorage.setItem(`jannah-${key}`, JSON.stringify(value)); } catch { /* Private browsing may disable storage. */ } }
  };
  const todayKey = new Date().toISOString().slice(0, 10);
  const surahsFallback = [
    ['Al-Fatihah','الفاتحة',7,'Meccan'],['Al-Baqarah','البقرة',286,'Medinan'],['Ali Imran','آل عمران',200,'Medinan'],['An-Nisa','النساء',176,'Medinan'],['Al-Maidah','المائدة',120,'Medinan'],['Al-Anam','الأنعام',165,'Meccan'],['Al-Araf','الأعراف',206,'Meccan'],['Al-Anfal','الأنفال',75,'Medinan'],['At-Tawbah','التوبة',129,'Medinan'],['Yunus','يونس',109,'Meccan'],['Hud','هود',123,'Meccan'],['Yusuf','يوسف',111,'Meccan'],['Ar-Rad','الرعد',43,'Medinan'],['Ibrahim','إبراهيم',52,'Meccan'],['Al-Hijr','الحجر',99,'Meccan'],['An-Nahl','النحل',128,'Meccan'],['Al-Isra','الإسراء',111,'Meccan'],['Al-Kahf','الكهف',110,'Meccan'],['Maryam','مريم',98,'Meccan'],['Ta-Ha','طه',135,'Meccan'],['Al-Anbiya','الأنبياء',112,'Meccan'],['Al-Hajj','الحج',78,'Medinan'],['Al-Muminun','المؤمنون',118,'Meccan'],['An-Nur','النور',64,'Medinan'],['Al-Furqan','الفرقان',77,'Meccan'],['Ash-Shuara','الشعراء',227,'Meccan'],['An-Naml','النمل',93,'Meccan'],['Al-Qasas','القصص',88,'Meccan'],['Al-Ankabut','العنكبوت',69,'Meccan'],['Ar-Rum','الروم',60,'Meccan'],['Luqman','لقمان',34,'Meccan'],['As-Sajdah','السجدة',30,'Meccan'],['Al-Ahzab','الأحزاب',73,'Medinan'],['Saba','سبأ',54,'Meccan'],['Fatir','فاطر',45,'Meccan'],['Ya-Sin','يس',83,'Meccan'],['As-Saffat','الصافات',182,'Meccan'],['Sad','ص',88,'Meccan'],['Az-Zumar','الزمر',75,'Meccan'],['Ghafir','غافر',85,'Meccan'],['Fussilat','فصلت',54,'Meccan'],['Ash-Shura','الشورى',53,'Meccan'],['Az-Zukhruf','الزخرف',89,'Meccan'],['Ad-Dukhan','الدخان',59,'Meccan'],['Al-Jathiyah','الجاثية',37,'Meccan'],['Al-Ahqaf','الأحقاف',35,'Meccan'],['Muhammad','محمد',38,'Medinan'],['Al-Fath','الفتح',29,'Medinan'],['Al-Hujurat','الحجرات',18,'Medinan'],['Qaf','ق',45,'Meccan'],['Adh-Dhariyat','الذاريات',60,'Meccan'],['At-Tur','الطور',49,'Meccan'],['An-Najm','النجم',62,'Meccan'],['Al-Qamar','القمر',55,'Meccan'],['Ar-Rahman','الرحمن',78,'Medinan'],['Al-Waqiah','الواقعة',96,'Meccan'],['Al-Hadid','الحديد',29,'Medinan'],['Al-Mujadilah','المجادلة',22,'Medinan'],['Al-Hashr','الحشر',24,'Medinan'],['Al-Mumtahanah','الممتحنة',13,'Medinan'],['As-Saff','الصف',14,'Medinan'],['Al-Jumuah','الجمعة',11,'Medinan'],['Al-Munafiqun','المنافقون',11,'Medinan'],['At-Taghabun','التغابن',18,'Medinan'],['At-Talaq','الطلاق',12,'Medinan'],['At-Tahrim','التحريم',12,'Medinan'],['Al-Mulk','الملك',30,'Meccan'],['Al-Qalam','القلم',52,'Meccan'],['Al-Haqqah','الحاقة',52,'Meccan'],['Al-Maarij','المعارج',44,'Meccan'],['Nuh','نوح',28,'Meccan'],['Al-Jinn','الجن',28,'Meccan'],['Al-Muzzammil','المزمل',20,'Meccan'],['Al-Muddaththir','المدثر',56,'Meccan'],['Al-Qiyamah','القيامة',40,'Meccan'],['Al-Insan','الإنسان',31,'Medinan'],['Al-Mursalat','المرسلات',50,'Meccan'],['An-Naba','النبأ',40,'Meccan'],['An-Naziat','النازعات',46,'Meccan'],['Abasa','عبس',42,'Meccan'],['At-Takwir','التكوير',29,'Meccan'],['Al-Infitar','الانفطار',19,'Meccan'],['Al-Mutaffifin','المطففين',36,'Meccan'],['Al-Inshiqaq','الانشقاق',25,'Meccan'],['Al-Buruj','البروج',22,'Meccan'],['At-Tariq','الطارق',17,'Meccan'],['Al-Ala','الأعلى',19,'Meccan'],['Al-Ghashiyah','الغاشية',26,'Meccan'],['Al-Fajr','الفجر',30,'Meccan'],['Al-Balad','البلد',20,'Meccan'],['Ash-Shams','الشمس',15,'Meccan'],['Al-Layl','الليل',21,'Meccan'],['Ad-Duha','الضحى',11,'Meccan'],['Ash-Sharh','الشرح',8,'Meccan'],['At-Tin','التين',8,'Meccan'],['Al-Alaq','العلق',19,'Meccan'],['Al-Qadr','القدر',5,'Meccan'],['Al-Bayyinah','البينة',8,'Medinan'],['Az-Zalzalah','الزلزلة',8,'Medinan'],['Al-Adiyat','العاديات',11,'Meccan'],['Al-Qariah','القارعة',11,'Meccan'],['At-Takathur','التكاثر',8,'Meccan'],['Al-Asr','العصر',3,'Meccan'],['Al-Humazah','الهمزة',9,'Meccan'],['Al-Fil','الفيل',5,'Meccan'],['Quraysh','قريش',4,'Meccan'],['Al-Maun','الماعون',7,'Meccan'],['Al-Kawthar','الكوثر',3,'Meccan'],['Al-Kafirun','الكافرون',6,'Meccan'],['An-Nasr','النصر',3,'Medinan'],['Al-Masad','المسد',5,'Meccan'],['Al-Ikhlas','الإخلاص',4,'Meccan'],['Al-Falaq','الفلق',5,'Meccan'],['An-Nas','الناس',6,'Meccan']
  ].map((s, i) => ({number:i+1,name:s[0],arabic:s[1],numberOfAyahs:s[2],revelationType:s[3]}));
  const duas = [
    {category:'morning',label:'Morning',arabic:'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ',translit:'Asbahna wa asbahal-mulku lillah, wal-hamdu lillah.',meaning:'We have entered a new morning and with it all dominion belongs to Allah; all praise is for Allah.',source:'Sahih Muslim 2723'},
    {category:'evening',label:'Evening',arabic:'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ',translit:'Amsayna wa amsal-mulku lillah, wal-hamdu lillah.',meaning:'We have entered the evening and with it all dominion belongs to Allah; all praise is for Allah.',source:'Sahih Muslim 2723'},
    {category:'anytime',label:'Seeking knowledge',arabic:'رَبِّ زِدْنِي عِلْمًا',translit:'Rabbi zidni ilma.',meaning:'My Lord, increase me in knowledge.',source:'Quran 20:114'},
    {category:'anytime',label:'For goodness',arabic:'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',translit:'Rabbana atina fid-dunya hasanatan wa fil-akhirati hasanatan waqina adhaban-nar.',meaning:'Our Lord, give us good in this world and good in the Hereafter, and protect us from the punishment of the Fire.',source:'Quran 2:201'},
    {category:'anytime',label:'Before sleeping',arabic:'بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا',translit:'Bismika Allahumma amutu wa ahya.',meaning:'In Your name, O Allah, I die and I live.',source:'Sahih al-Bukhari 6324'},
    {category:'anytime',label:'For parents',arabic:'رَبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا',translit:'Rabbir-hamhuma kama rabbayani saghira.',meaning:'My Lord, have mercy upon them as they brought me up when I was small.',source:'Quran 17:24'},
    {category:'anytime',label:'When leaving home',arabic:'بِسْمِ اللَّهِ، تَوَكَّلْتُ عَلَى اللَّهِ، وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ',translit:'Bismillah, tawakkaltu alallah, wa la hawla wa la quwwata illa billah.',meaning:'In the name of Allah; I place my trust in Allah. There is no might nor power except with Allah.',source:'Sunan Abi Dawud 5095'},
    {category:'anytime',label:'For forgiveness',arabic:'رَبَّنَا ظَلَمْنَا أَنْفُسَنَا وَإِنْ لَمْ تَغْفِرْ لَنَا وَتَرْحَمْنَا لَنَكُونَنَّ مِنَ الْخَاسِرِينَ',translit:'Rabbana zalamna anfusana wa illam taghfir lana wa tarhamna lanakunanna minal-khasirin.',meaning:'Our Lord, we have wronged ourselves, and if You do not forgive us and have mercy upon us, we will surely be among the losers.',source:'Quran 7:23'}
  ];
  const reminders=[['The most beloved deeds to Allah are those that are most consistent, even if they are small.','Sahih al-Bukhari 6464'],['A kind word is charity.','Sahih al-Bukhari 2989'],['Remember Allah, and He will remember you.','Quran 2:152'],['Indeed, Allah is with the patient.','Quran 2:153'],['Allah does not burden a soul beyond what it can bear.','Quran 2:286'],['And whoever puts their trust in Allah, then He is sufficient for them.','Quran 65:3']];
  const quiz=[
    {q:'How many surahs are in the Quran?',o:['99','114','120','30'],a:1,why:'The Quran contains 114 surahs.'},
    {q:'Which surah is known as “The Opening”?',o:['Al-Ikhlas','Al-Falaq','Al-Fatihah','An-Nas'],a:2,why:'Al-Fatihah means “The Opening” and begins the Quran.'},
    {q:'Which month do Muslims fast in?',o:['Muharram','Ramadan','Shawwal','Rajab'],a:1,why:'Fasting in Ramadan is one of the Five Pillars of Islam.'},
    {q:'How many daily obligatory prayers are there?',o:['Three','Four','Five','Seven'],a:2,why:'Muslims perform five obligatory prayers each day.'},
    {q:'What is the direction Muslims face in prayer called?',o:['Mihrab','Qiblah','Minbar','Wudu'],a:1,why:'The Qiblah is the direction of the Kaaba in Makkah.'}
  ];
  const deeds=['Pray with presence','Read or listen to a little Quran','Make dhikr or dua','Offer someone kindness','Give charity or help someone'];
  let surahs=surahsFallback, quizIndex=0, quizAnswered=false, toastTimer;
  function escapeHtml(value){return String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
  function showToast(message){const toast=$('#toast');toast.textContent=message;toast.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),2100);}
  function navigate(view){const target=document.getElementById(`${view}-view`);if(!target)return;$$('.view').forEach(el=>el.classList.toggle('active',el===target));$$('.nav-item').forEach(el=>{const active=el.dataset.view===view;el.classList.toggle('active',active);if(active)el.setAttribute('aria-current','page');else el.removeAttribute('aria-current');});$('#surah-reader').hidden=true;$('#surah-list').hidden=false;window.scrollTo({top:0,behavior:'smooth'});}
  $$('.nav-item').forEach(btn=>btn.addEventListener('click',()=>navigate(btn.dataset.view)));
  $$('[data-open]').forEach(btn=>btn.addEventListener('click',()=>navigate(btn.dataset.open)));
  $('#today-label').textContent=new Intl.DateTimeFormat(undefined,{weekday:'long'}).format(new Date()).toUpperCase()+' · YOUR DAILY PAUSE';
  $('#date-pill').textContent=new Intl.DateTimeFormat(undefined,{month:'short',day:'numeric'}).format(new Date());
  $('#theme-toggle').addEventListener('click',()=>{document.body.classList.toggle('dark');store.set('dark',document.body.classList.contains('dark'));});
  if(store.get('dark',false))document.body.classList.add('dark');

  function renderSurahs(filter=''){$('#surah-list').innerHTML='';const matched=surahs.filter(s=>`${s.number} ${s.name} ${s.arabic}`.toLowerCase().includes(filter.toLowerCase()));if(!matched.length){$('#surah-list').innerHTML='<p class="empty-state">No surahs found. Try another search.</p>';return;}matched.forEach(s=>{const button=document.createElement('button');button.className='surah-row';button.type='button';button.innerHTML=`<span class="surah-number">${s.number}</span><span class="surah-info"><b>${escapeHtml(s.name)}</b><small>${s.revelationType} · ${s.numberOfAyahs} ayahs</small></span><span class="surah-arabic" lang="ar" dir="rtl">${escapeHtml(s.arabic)}</span>`;button.addEventListener('click',()=>openSurah(s));$('#surah-list').append(button);});}
  async function loadSurahs(){try{const response=await fetch('https://api.alquran.cloud/v1/surah');if(!response.ok)throw Error('Network response');const json=await response.json();if(json.code===200&&Array.isArray(json.data)&&json.data.length===114)surahs=json.data;}catch{/* The full local surah index remains available offline. */}renderSurahs();}
  async function openSurah(s){$('#surah-list').hidden=true;$('#surah-reader').hidden=false;$('#surah-content').innerHTML=`<div class="reader-title"><h2>${escapeHtml(s.name)} · <span class="arabic" lang="ar">${escapeHtml(s.arabic)}</span></h2><p>${s.revelationType} · ${s.numberOfAyahs} ayahs</p></div><p class="loading">Loading verses and translation…</p>`;try{const response=await fetch(`https://api.alquran.cloud/v1/surah/${s.number}/editions/quran-uthmani,en.sahih`);if(!response.ok)throw Error('Network response');const json=await response.json();if(json.code!==200||!json.data||json.data.length<2)throw Error('No data');const arabic=json.data[0].ayahs,english=json.data[1].ayahs;$('#surah-content').innerHTML=`<div class="reader-title"><h2>${escapeHtml(s.name)} · <span class="arabic" lang="ar">${escapeHtml(s.arabic)}</span></h2><p>${s.revelationType} · ${s.numberOfAyahs} ayahs · Translation: Saheeh International</p></div>${arabic.map((ayah,i)=>`<article class="ayah"><div class="arabic" lang="ar" dir="rtl">${escapeHtml(ayah.text)} <span class="ayah-number">۞ ${ayah.numberInSurah}</span></div><p class="ayah-translation">${escapeHtml(english[i]?.text||'')}</p></article>`).join('')}`;window.scrollTo({top:0,behavior:'smooth'});}catch{$('#surah-content').innerHTML=`<div class="reader-title"><h2>${escapeHtml(s.name)} · <span class="arabic" lang="ar">${escapeHtml(s.arabic)}</span></h2><p>${s.revelationType} · ${s.numberOfAyahs} ayahs</p></div><p class="empty-state">Verses need an internet connection to load. Please try again when you're online.</p>`;}}
  $('#surah-search').addEventListener('input',e=>renderSurahs(e.target.value));$('#back-to-surahs').addEventListener('click',()=>{$('#surah-reader').hidden=true;$('#surah-list').hidden=false;});loadSurahs();

  function renderDuas(filter='all'){$('#dua-list').innerHTML=duas.filter(d=>filter==='all'||d.category===filter).map(d=>`<article class="dua-card"><div class="dua-meta"><span class="dua-tag">${escapeHtml(d.label)}</span><button class="copy-button" type="button" data-copy="${escapeHtml(d.arabic+'\n'+d.translit+'\n'+d.meaning)}">Copy dua</button></div><p class="dua-arabic arabic" lang="ar" dir="rtl">${escapeHtml(d.arabic)}</p><p class="dua-translit">${escapeHtml(d.translit)}</p><p class="dua-meaning">${escapeHtml(d.meaning)}</p><p class="dua-source">${escapeHtml(d.source)}</p></article>`).join('');$$('[data-copy]').forEach(btn=>btn.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(btn.dataset.copy);showToast('Dua copied');}catch{showToast('Copy is unavailable in this browser');}}));}
  $$('.filter-chip').forEach(btn=>btn.addEventListener('click',()=>{$$('.filter-chip').forEach(x=>x.classList.toggle('selected',x===btn));renderDuas(btn.dataset.filter);}));renderDuas();

  let count=store.get('tasbih',0);function drawCount(){$('#count-number').textContent=count;$('#count-button').setAttribute('aria-label',`Tasbih count ${count}. Tap to increment.`);}drawCount();$('#count-button').addEventListener('click',()=>{count++;store.set('tasbih',count);drawCount();});$('#undo-count').addEventListener('click',()=>{count=Math.max(0,count-1);store.set('tasbih',count);drawCount();});$('#reset-count').addEventListener('click',()=>{count=0;store.set('tasbih',count);drawCount();});$('#dhikr-select').addEventListener('change',e=>$('#selected-dhikr').textContent=e.target.value);

  let reminderIndex=0;$('#new-reminder').addEventListener('click',()=>{reminderIndex=(reminderIndex+1)%reminders.length;$('#reminder-text').textContent=reminders[reminderIndex][0];$('#reminder-source').textContent=reminders[reminderIndex][1];});
  function renderQuiz(){const item=quiz[quizIndex];$('#quiz-progress').textContent=`Question ${quizIndex+1} of ${quiz.length}`;$('#quiz-question').textContent=item.q;$('#quiz-feedback').textContent='';$('#next-question').hidden=true;quizAnswered=false;$('#quiz-options').innerHTML=item.o.map((option,index)=>`<button class="quiz-option" type="button" data-answer="${index}">${escapeHtml(option)}</button>`).join('');$$('.quiz-option').forEach(btn=>btn.addEventListener('click',()=>{if(quizAnswered)return;quizAnswered=true;const chosen=Number(btn.dataset.answer);$$('.quiz-option').forEach((option,i)=>{option.disabled=true;if(i===item.a)option.classList.add('correct');else if(i===chosen)option.classList.add('incorrect');});$('#quiz-feedback').textContent=(chosen===item.a?'Correct! ':'Not quite. ')+item.why;$('#next-question').textContent=quizIndex===quiz.length-1?'Start again ↻':'Next question →';$('#next-question').hidden=false;}));}
  $('#next-question').addEventListener('click',()=>{quizIndex=(quizIndex+1)%quiz.length;renderQuiz();});renderQuiz();
  function renderDeeds(){let saved=store.get('deeds',{});if(saved.date!==todayKey)saved={date:todayKey,done:[]};$('#deed-list').innerHTML=deeds.map((deed,index)=>`<label class="deed-item ${saved.done.includes(index)?'done':''}"><input type="checkbox" data-deed="${index}" ${saved.done.includes(index)?'checked':''}><span>${escapeHtml(deed)}</span></label>`).join('');$('#deed-score').textContent=`${saved.done.length} / ${deeds.length}`;$$('[data-deed]').forEach(box=>box.addEventListener('change',()=>{const state=store.get('deeds',{date:todayKey,done:[]});if(box.checked&&!state.done.includes(Number(box.dataset.deed)))state.done.push(Number(box.dataset.deed));else state.done=state.done.filter(i=>i!==Number(box.dataset.deed));state.date=todayKey;store.set('deeds',state);renderDeeds();}));}
  $('#reset-deeds').addEventListener('click',()=>{store.set('deeds',{date:todayKey,done:[]});renderDeeds();});renderDeeds();

  // Telegram's WebApp bridge is optional; the same app works as a normal Pages website.
  try{const tg=window.Telegram?.WebApp;if(tg){tg.ready();tg.expand();if(tg.themeParams?.bg_color)document.documentElement.style.setProperty('--cream',tg.themeParams.bg_color);}}catch{/* Ignore unavailable Telegram bridge. */}
})();
  // Monetag voluntary rewarded adverts
  const interstitialButton = $('#rewarded-interstitial-button');
  const popupButton = $('#rewarded-popup-button');

  function handleAdResult(result) {
    if (result?.reward_event_type === 'valued') {
      showToast('Thank you for supporting Jannah Path!');
    } else {
      showToast('No reward confirmation received. Thank you for trying.');
    }
  }

  function handleAdError(error) {
    console.warn('Monetag advert error:', error);
    showToast('Advert unavailable. Please try again later.');
  }

  if (interstitialButton) {
    interstitialButton.addEventListener('click', () => {
      if (typeof window.show_12194311 !== 'function') {
        showToast('Ad service is not ready yet.');
        return;
      }

      interstitialButton.disabled = true;

      try {
        Promise.resolve(window.show_12194311({
          type: 'end',
          requestVar: 'support_interstitial'
        }))
          .then(handleAdResult)
          .catch(handleAdError)
          .finally(() => {
            interstitialButton.disabled = false;
          });
      } catch (error) {
        interstitialButton.disabled = false;
        handleAdError(error);
      }
    });
  }

  if (popupButton) {
    popupButton.addEventListener('click', () => {
      if (typeof window.show_12194311 !== 'function') {
        showToast('Ad service is not ready yet.');
        return;
      }

      popupButton.disabled = true;

      try {
        Promise.resolve(window.show_12194311({
          type: 'pop',
          requestVar: 'support_popup'
        }))
          .then(handleAdResult)
          .catch(handleAdError)
          .finally(() => {
            popupButton.disabled = false;
          });
      } catch (error) {
        popupButton.disabled = false;
        handleAdError(error);
      }
    });
        }
