/* Extra scenes for Diya's birthday surprise. Runs before the main story script. */
var extrasState={answer:null,secrets:new Set(),photoMistakes:0,chatStep:0};

document.addEventListener('click',function(event){
  const choice=event.target.closest?.('[data-choice]');
  if(choice)extrasState.answer=choice.dataset.choice;
},true);

function supportChat(){
  return '<div class="eyebrow">استني يا ضي… عندي حركة تانية</div><h2 class="question">عاملة شكوى فيا ولا إيه؟</h2><p class="copy">بما إنك مستعجلة على الهدية، تعالي نتفاهم الأول.</p><div class="supportPhone"><div class="supportHead"><i>♡</i><span>أشرف · موجود بس بيستظرف</span></div><div class="supportMessages" aria-live="polite"><div class="chatBubble">يا ضي، إنتِ وصلتي لخدمة العملاء بتاعتي شخصيًا. عايزة إيه؟</div></div><div class="supportOptions"><button type="button" data-support="where">فين هديتي؟</button><button type="button" data-support="complaint">أنا هشتكي الموقع</button></div></div>';
}
function bindSupportChat(){
  extrasState.chatStep=0;
  const messages=card.querySelector('.supportMessages'),options=card.querySelector('.supportOptions');
  function bubble(words,kind){const el=document.createElement('div');el.className='chatBubble'+(kind?' '+kind:'');el.textContent=words;messages.appendChild(el);el.scrollIntoView({block:'nearest',behavior:'smooth'})}
  options.addEventListener('click',e=>{
    const button=e.target.closest('button');if(!button)return;
    const action=button.dataset.support;if(action==='continue'){next(250);return}
    options.replaceChildren();bubble(button.textContent,'mine');tone('tap');
    if(extrasState.chatStep===0){
      extrasState.chatStep=1;
      later(()=>{
        bubble(action==='where'?'يا بنتي ما أنا بقولك اصبري شوية.':'هتشتكيني لمين بس؟ أنا اللي عامل الموقع أصلًا.');
        options.innerHTML='<button type="button" data-support="boss">عايزة أكلم المسؤول</button><button type="button" data-support="wait">طب هتخلصوا إمتى؟</button>';
      },450);
    }else{
      extrasState.chatStep=2;
      later(()=>{
        bubble(action==='boss'?'أنا المسؤول يا ستي، وبقولك متزعليش… مخبيلك حاجة حلوة.':'بعد شوية يا ضي… استحملي رخامتي النهارده معلش.','fromAshraf');
        options.innerHTML='<button type="button" data-support="continue">ماشي… وريني اللي بعده</button>';
      },450);
    }
  });
}

function errorPrank(){
  return '<div class="eyebrow">ثانية واحدة بس</div><h2 class="question">يا نهار أبيض… الموقع علّق!</h2><div class="errorPanel" role="status" aria-live="polite"><b>يا ضي إنتِ ماشية بسرعة ليه كده؟</b><p class="errorStatus">استني بس أشوف أنا بوظت إيه.</p><div class="errorRepair"><span></span></div></div><p class="copy">بهزر معاكي، متقفليش الصفحة.</p>';
}
function bindErrorPrank(){
  const panel=card.querySelector('.errorPanel'),status=card.querySelector('.errorStatus');
  later(()=>{panel.querySelector('.errorRepair span').style.width='100%';status.textContent='مفيش حاجة بايظة أصلًا، كنت برخم عليكي.';tone('ok')},850);
  later(()=>next(),2350);
}

function caseFile(){
  const answer=({wait:'قولتي هتستني الهدية… وأنا المفروض أصدقك؟',peek:'يعني بصيتي على الهدية بس؟ ماشي يا ستي.',ask:'سألتي عن الهدية كام مرة كده؟'})[extrasState.answer]||'لحد دلوقتي مستحملاني… ودي لوحدها حاجة كبيرة.';
  const buttonEvidence=trollClicks>0?'دوستي على زر «آخر ضغطة» '+trollClicks+' مرات.':'مستحملة زرايري الرخمة لحد دلوقتي.';
  return '<div class="eyebrow">عندي كلمتين أقولهم</div><h2 class="question">يا ضي… اتقفشتي خلاص</h2><div class="caseSheet"><span class="caseStamp">سري جدًا ✦</span><h3>محضر رخامة شخصي</h3><ul><li>'+answer+'</li><li>'+buttonEvidence+'</li><li>كل ما أقولك خلاص، أطلعلك بحاجة تانية… أنا عارف.</li></ul><p class="caseVerdict">طيب تستاهلي الهدية… بس استنيني حركة واحدة.</p></div><div class="actions">'+btn('مش هسامحك يا أشرف','hot big','data-case-go')+'</div>';
}
function bindCaseFile(){card.querySelector('[data-case-go]').onclick=()=>{say('حاضر حقك عليا… بس هنكمل برضه.');next(650)}}

function photoClue(){
  const choices=[0,2,4];
  return '<div class="eyebrow">دي بقى ذكرى لينا</div><h2 class="question">فاكرة الصورة دي يا ضي؟</h2><p class="copy">مكبّرلك حتة منها بس. قوليلي أنهي واحدة، ولو غلطتي هتسمعي كلمتين.</p><div class="photoMystery"><div class="photoClueFrame"><img src="'+PHOTO_SOURCES[2]+'" alt="جزء مكبر من ذكرى" loading="eager"></div><div class="photoOptions">'+choices.map((i,n)=>'<button type="button" data-photo-answer="'+i+'" aria-label="اختيار الصورة '+(n+1)+'"><img src="'+PHOTO_SOURCES[i]+'" alt="اختيار '+(n+1)+'"><span>الصورة '+(n+1)+'</span></button>').join('')+'</div><div class="reaction" aria-live="polite">فاكرة اللقطة دي؟</div><div class="actions" hidden>'+btn('يلا نكمل يا ضي','hot big','data-photo-go')+'</div></div>';
}
function bindPhotoClue(){
  extrasState.photoMistakes=0;
  const buttons=[...card.querySelectorAll('[data-photo-answer]')],reaction=card.querySelector('.reaction');
  buttons.forEach(button=>button.onclick=()=>{
    if(button.disabled)return;
    if(+button.dataset.photoAnswer!==2){
      extrasState.photoMistakes++;button.classList.add('wrong');button.disabled=true;tone('no');
      reaction.textContent=extrasState.photoMistakes===1?'لأ يا ضي، دي حلوة بس مش هي. بصي كويس.':'أنا مش بضحك والله… جربي اللي فاضلة.';
      return;
    }
    buttons.forEach(b=>b.disabled=true);button.classList.add('correct');card.querySelector('.photoClueFrame').classList.add('revealed');
    reaction.textContent='أيوه هي دي! بحب الصورة دي وبحب ذكرياتها معاكي.';card.querySelector('.photoMystery .actions').hidden=false;tone('win');
  });
  card.querySelector('[data-photo-go]').onclick=()=>next(300);
}

function mountSecretMarks(){
  const marks={3:['✦','إيه ده، لقيتي السر؟ شاطرة يا ضي.'],13:['♡','بصي، ضحكتك أحلى من اللعبة دي كلها.'],24:['☾','آه، دي كنت مخبيهالك مخصوص.']};
  const mark=marks[screen];if(!mark)return;
  const button=document.createElement('button');button.type='button';button.className='secretMark'+(extrasState.secrets.has(screen)?' found':'');
  button.textContent=mark[0];button.setAttribute('aria-label','سر صغير مخفي');button.title='جربي تضغطي';
  button.onclick=()=>{extrasState.secrets.add(screen);button.classList.add('found');say(mark[1],3200);tone('win')};
  card.querySelector('.screen')?.appendChild(button);
}
function bonusSecretMarkup(){
  return extrasState.secrets.size?'<div class="secretNote">ولأنك لقيتي السر: أنا بعمل الرخامة دي كلها عشان أشوف ضحكتك في الآخر.</div>':'';
}
function certificateMarkup(){
  return '<section class="certificateCard"><div class="eyebrow">بصي بقى عملتلك إيه</div><h3>شهادة إنك استحملتي أشرف</h3><p>يا ضي، بعد كل اللي عملته فيكي، تستاهلي الشهادة دي بجد. احتفظي بيها دليل ضدي.</p><button type="button" class="btn hot" data-certificate>احتفظي بالدليل ده</button></section>';
}
function certificateTitle(){
  return extrasState.answer==='wait'?'بطلة الصبر عليا':extrasState.answer==='ask'?'مديرة الأسئلة اللي مبتخلصش':'خبيرة كشف الهدايا';
}
async function downloadCertificate(){
  try{await document.fonts.ready}catch(e){}
  const canvas=document.createElement('canvas');canvas.width=1080;canvas.height=1350;
  const ctx=canvas.getContext('2d');if(!ctx)return;
  const gradient=ctx.createLinearGradient(0,0,1080,1350);gradient.addColorStop(0,'#fff9ed');gradient.addColorStop(.55,'#fff1f8');gradient.addColorStop(1,'#eee8ff');ctx.fillStyle=gradient;ctx.fillRect(0,0,1080,1350);
  ctx.strokeStyle='#dd79a8';ctx.lineWidth=11;ctx.strokeRect(54,54,972,1242);ctx.strokeStyle='#e9c4d8';ctx.lineWidth=2;ctx.strokeRect(76,76,928,1198);
  ctx.direction='rtl';ctx.textAlign='center';ctx.fillStyle='#b12f71';ctx.font='800 54px RabieExact, Tahoma, sans-serif';ctx.fillText('شهادة رسمية جدًا',540,250);
  ctx.fillStyle='#45273b';ctx.font='800 100px RabieExact, Tahoma, sans-serif';ctx.fillText('ضي',540,445);
  ctx.font='700 44px RabieExact, Tahoma, sans-serif';ctx.fillText(certificateTitle(),540,570);
  ctx.font='600 32px RabieExact, Tahoma, sans-serif';ctx.fillText('استحملت رخامة أشرف للنهاية',540,700);ctx.fillText('وصدقتني كل مرة أقول خلاص',540,762);
  ctx.fillStyle='#b12f71';ctx.font='800 70px RabieExact, Tahoma, sans-serif';ctx.fillText('♡ ✦ ♡',540,930);
  ctx.font='700 35px RabieExact, Tahoma, sans-serif';ctx.fillText('بكل حب — من أشرف',540,1090);
  ctx.font='600 22px RabieExact, Tahoma, sans-serif';ctx.fillText('لضي، من أشرف • احتفظي بيها عشان تفضحيني',540,1190);
  const link=document.createElement('a');link.download='diya-birthday-certificate.png';link.href=canvas.toDataURL('image/png');document.body.appendChild(link);link.click();link.remove();
}
function resetExtras(){extrasState.answer=null;extrasState.secrets.clear();extrasState.photoMistakes=0;extrasState.chatStep=0}


/* Make all the main scenes sound like Ashraf talking directly to Diya.
   Text-only; does not alter buttons, transitions, CSS, photos, or audio. */
(function installAshrafVoice() {
  if (window.__ashrafVoiceInstalled) return;
  window.__ashrafVoiceInstalled = true;
  const copy = new Map([["يا ضي… عندي ليكي حاجة مستخبية هنا","يا ضي… عملتلك حاجة صغيرة كده"],["بس الموقع قرر يعمل فيها تقيل شوية.","بس أنا مش ناوي أديهالك بالساهل طبعًا."],["مفاجأة عيد ميلاد… بس مش بالسهولة دي","يا ضي، بصي أنا عملتلك إيه"],["ملحوظة: الرجوع دلوقتي يعتبر استسلام مبكر جدًا.","وبلاش تقفلي من أول مقلب يا ضي."],["سؤال اعترافات","تعالي نشوف هتقولي الحقيقة ولا لأ"],["لو هدية عيد ميلادك قدامك ومكتوب عليها “ممنوع الفتح”؟","لو لقيتي هدية قدامك وقلتلك متفتحيهاش، هتعملي إيه؟"],["اختاري اللي هيحصل بجد، مش النسخة المؤدبة منك.","ردي بصراحة، أنا عارفك على فكرة."],["اختبار الصراحة","طب سؤال تاني"],["اضغطي الزر لو الجملة دي حقيقية.","وريني بقى هتقدري تدوسي على الزر ده ولا لأ."],["هو زر واحد. يعني المفروض الموضوع سهل جدًا.","زر واحد أهو، الموضوع بسيط خالص… تقريبًا."],["أنا مش فضولية خالص","أنا مش مستعجلة خالص"],["لو هرب منك، أكيد صدفة.","أنا ماليش دعوة لو اتحرك."],["أبسط زر في الموقع","معلش ضغطة كمان"],["اضغطي “كملي”.","دوسي كملي يا ضي."],["مش هيحصل حاجة غريبة. ثقة متبادلة وكده.","المرة دي مش هستهبل معاكي… يمكن."],["مقياس فضول غير معتمد","عندي فضول أعرف حاجة"],["قد إيه نفسك تعرفي النهاية؟","على مقياس من صفر لمية… مستعجلة قد إيه؟"],["اختاري النسبة. لو حاولتي تباني هادية، السلايدر نفسه هيلاحظ.","بلاش تعملي فيها هادية، قولي الحقيقة."],["شوية تفريغ توتر","خدي استراحة رخامة"],["ليه؟ مفيش سبب. بس شكلها مسلي وأنا قلت أطوّل الموضوع.","عشان أنا قررت أطوّل عليكي وخلاص."],["مهمة جانبية غير ضرورية","محتاج منك خدمة سخيفة"],["أنا عارف إن دي رخامة واضحة، بس للأسف داخلة في المنهج.","عارف والله إني برخم، استحمليني."],["أكيد واحدة من دول الهدية… صح؟","تفتكري الهدية فين؟"],["اختاري صندوق.","جربي تفتحي صندوق يا ضي."],["فيه صندوق واحد بس هيسمحلك تكملي. الباقي عنده ثقة زيادة.","واحد منهم هيسيبك تكملي، والباقي عامل مهم."],["اختبار الصبر الرسمي","هنشوف صبرك عامل إيه"],["استني العداد يخلص.","استني كام ثانية بس."],["ممنوع الضغط على أي حاجة. أخيرًا مرحلة مفيهاش شغل.","المرة دي مش هتعملي حاجة، اتفرجي بس."],["استمارة موافقة","ورقة كده لازم تمضي عليها"],["علمي على الجمل دي عشان نكمّل.","وافقيلي على الحاجات دي يا ضي."],["دي إجراءات شكلية جدًا ومفيش منها فايدة عملية.","أنا اللي حاطط الشروط ومش عارف ليه بصراحة."],["طيب نعمل حاجة ليها علاقة بعيد الميلاد","يلا نعمل حاجة مفيدة بقى"],["اطفي الخمس شمعات.","اطفي الشمع يا ضي."],["المرة دي مفيش خدعة تقريبًا.","مش هعمل حاجة… متبصّليش كده."],["آسفين… كانت نهاية مزيفة","إنتِ صدقتي إني خلصت؟"],["دلوقتي لعبة ذاكرة صغيرة.","طب وريني ذاكرتك عاملة إيه."],["طلعي الأزواج الأربعة. أهو نخلي الموضوع يستاهل الرخامة.","طلّعي كل صورتين شبه بعض، وبعدها أكمل معاكي."],["قفل كلامي شوية","معلش محتاج كلمة سر"],["اكتبي الجملة السرية عشان نفتح.","اكتبي الجملة دي عشان أفتحلك اللي بعدها."],["اختبار أعصاب صغير","آخر طلب رخِم مني"],["فضّلي ضاغطة على الزر 3 ثواني.","خليكي دايسة على الزر تلات ثواني."],["لو سيبتيه بدري، هنبدأ من الأول. دي قوانين رخمة بس واضحة.","لو سيبتيه هنبدأ تاني، متزعليش مني."],["اختيار عشوائي جدًا","اختاري ظرف على ذوقك"],["اختاري الظرف اللي فيه التكملة.","تفتكري أنا مخبّي التكملة في أنهي ظرف؟"],["واحد فيهم صح. الاتنين التانيين كلامهم كتير على الفاضي.","واحد صح، والاتنين التانيين بيستظرفوا زيي."],["واضح إنك عنيدة فعلًا 😄","يا ضي إنتِ لسه مكملة؟"],["خلاص بقى، فاضل لمسة واحدة على الرسالة الحقيقية.","طيب طيب، هوريكي اللي مخبيه خلاص."],["إثبات إنك إنسانة مش روبوت مستعجل","عايز أتأكد إنك لسه مركزة معايا"],["اختاري كل القلوب وبس.","دوسي على القلوب بس، بلاش الحاجات التانية."],["جمعنا أمنيات السنة الجديدة","عايز أخبيلك كام أمنية"],["المسي النجوم الأربع عشان نخبّي جواهم أمنية.","دوسي على النجوم دي يا ضي."],["ورقة صغيرة منّي ليكي","كتبتلك كلمتين"],["قبل المفاجأة الكبيرة… افتحي دي.","قبل ما أوريكي المفاجأة… افتحي الورقة دي."],["خدي نفس… فاضل آخر حاجة ♡","طب يلا، كفاية رخامة لحد كده."],["خلاص بجد… المرة دي النهاية الحقيقية","خلاص يا ضي، المرة دي بجد"],["وشوية صور لينا في الآخر ♡","ودي شوية لحظات بحبها لينا"],["أعيدي الرخامة من الأول","عايزة تستحمليني تاني؟"],["اختبار الذاكرة: ممتاز جدًا ♡","إنتِ فاكرة كل حاجة تقريبًا!"],["النتيجة الرسمية","بصي يا ستي"],["اختبار الذاكرة اللطيف","طب فاكرة اللي حصل من شوية؟"]]);
  const rewrite = function(root) {
    if (!root) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    for (const node of nodes) {
      const raw = node.nodeValue, key = raw.trim(), value = copy.get(key);
      if (value && value !== key) node.nodeValue = raw.replace(key, value);
    }
  };
  const mount = function() {
    const root = document.querySelector('.card');
    if (!root) return;
    rewrite(root);
    const observer = new MutationObserver(function(records) {
      for (const record of records) {
        if (record.type === 'characterData') rewrite(record.target.parentNode);
        for (const node of record.addedNodes) {
          if (node.nodeType === Node.ELEMENT_NODE) rewrite(node);
          else if (node.nodeType === Node.TEXT_NODE) rewrite(node.parentNode);
        }
      }
    });
    observer.observe(root, {subtree:true, childList:true, characterData:true});
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount, {once:true});
  else mount();
})();
