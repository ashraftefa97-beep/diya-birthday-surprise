/* Extra scenes for Diya's birthday surprise. Runs before the main story script. */
var extrasState={answer:null,secrets:new Set(),photoMistakes:0,chatStep:0};

document.addEventListener('click',function(event){
  const choice=event.target.closest?.('[data-choice]');
  if(choice)extrasState.answer=choice.dataset.choice;
},true);

function supportChat(){
  return '<div class="eyebrow">قبل ما نكمل… جاتلنا شكوى</div><h2 class="question">خدمة عملاء الهدية</h2><p class="copy">المحادثة مسجلة لأغراض الرخامة فقط.</p><div class="supportPhone"><div class="supportHead"><i>♡</i><span>الدعم الفني للمفاجأة · متصل وبيتهرب</span></div><div class="supportMessages" aria-live="polite"><div class="chatBubble">أهلاً يا ضي. طلبك للوصول للهدية وصلنا… للأسف.</div></div><div class="supportOptions"><button type="button" data-support="where">فين هديتي؟</button><button type="button" data-support="complaint">أنا هشتكي الموقع</button></div></div>';
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
        bubble(action==='where'?'طلبك مهم لينا وبيتجاهل حاليًا بكل حب.':'الشكاوى بتتقدم للموقع نفسه… ودي بصراحة فكرة مش موفقة.');
        options.innerHTML='<button type="button" data-support="boss">عايزة أكلم المسؤول</button><button type="button" data-support="wait">طب هتخلصوا إمتى؟</button>';
      },450);
    }else{
      extrasState.chatStep=2;
      later(()=>{
        bubble(action==='boss'?'المسؤول اسمه أشرف… وبيقول بلاش زعل، هو مخبّي لك حاجة حلوة.':'بعد شوية يا ضي. أشرف بيقولك إن الضحكة دي من ضمن الهدية.','fromAshraf');
        options.innerHTML='<button type="button" data-support="continue">ماشي… وريني اللي بعده</button>';
      },450);
    }
  });
}

function errorPrank(){
  return '<div class="eyebrow">جارٍ تحميل المرحلة التالية</div><h2 class="question">لحظة واحدة يا ضي…</h2><div class="errorPanel" role="status" aria-live="polite"><b>خطأ 418: ضي خلصت أسرع من المتوقع</b><p class="errorStatus">الموقع بيحاول يلمّ نفسه.</p><div class="errorRepair"><span></span></div></div><p class="copy">ماتقلقيش… دي رخامة مدتها ثواني.</p>';
}
function bindErrorPrank(){
  const panel=card.querySelector('.errorPanel'),status=card.querySelector('.errorStatus');
  later(()=>{panel.querySelector('.errorRepair span').style.width='100%';status.textContent='اتصلح! كنت بهزر معاكي 😄';tone('ok')},850);
  later(()=>next(),2350);
}

function caseFile(){
  const answer=({wait:'قالت إنها هتستنى الهدية… وفتحها للصفحة حصل بالصدفة طبعًا.',peek:'اعترفت إن البصّة مجرد معاينة جودة.',ask:'سألت عن الهدية كذا مرة بحسن نية مشكوك فيه.'})[extrasState.answer]||'دخلت كل الاختبارات بشجاعة يُعتدّ بها.';
  const buttonEvidence=trollClicks>0?'ضغطت زر «آخر ضغطة» '+trollClicks+' مرات.':'تعاملت مع الأزرار بصبر ملحوظ.';
  return '<div class="eyebrow">قسم التحقيقات اللطيفة</div><h2 class="question">ملف قضية: ضي ضد الموقع</h2><div class="caseSheet"><span class="caseStamp">سري جدًا ✦</span><h3>تقرير الفضول الرسمي</h3><ul><li>'+answer+'</li><li>'+buttonEvidence+'</li><li>استحملت موقعًا بيقول «فاضل آخر حاجة» كل شوية.</li></ul><p class="caseVerdict">الحكم: تستحق الهدية… بعد آخر مقلب صغير.</p></div><div class="actions">'+btn('أعترض على الحكم','hot big','data-case-go')+'</div>';
}
function bindCaseFile(){card.querySelector('[data-case-go]').onclick=()=>{say('الاعتراض اتقبل… ورُفض في نفس الوقت.');next(650)}}

function photoClue(){
  const choices=[0,2,4];
  return '<div class="eyebrow">دليل من الذكريات</div><h2 class="question">خمني الصورة دي من القصاصة</h2><p class="copy">الصورة كاملة مستخبية. اختاريها من التلاتة دول، والغلط هنا مسموح بس الموقع هيعلّق.</p><div class="photoMystery"><div class="photoClueFrame"><img src="'+PHOTO_SOURCES[2]+'" alt="جزء مكبر من ذكرى" loading="eager"></div><div class="photoOptions">'+choices.map((i,n)=>'<button type="button" data-photo-answer="'+i+'" aria-label="اختيار الصورة '+(n+1)+'"><img src="'+PHOTO_SOURCES[i]+'" alt="اختيار '+(n+1)+'"><span>الصورة '+(n+1)+'</span></button>').join('')+'</div><div class="reaction" aria-live="polite">فاكرة اللقطة دي؟</div><div class="actions" hidden>'+btn('كمّلي للرسالة','hot big','data-photo-go')+'</div></div>';
}
function bindPhotoClue(){
  extrasState.photoMistakes=0;
  const buttons=[...card.querySelectorAll('[data-photo-answer]')],reaction=card.querySelector('.reaction');
  buttons.forEach(button=>button.onclick=()=>{
    if(button.disabled)return;
    if(+button.dataset.photoAnswer!==2){
      extrasState.photoMistakes++;button.classList.add('wrong');button.disabled=true;tone('no');
      reaction.textContent=extrasState.photoMistakes===1?'لأ، بس الصورة دي حلوة برضه… جربي تاني.':'أنا مش هضحك… بس الصورة الصح لسه قدامك.';
      return;
    }
    buttons.forEach(b=>b.disabled=true);button.classList.add('correct');card.querySelector('.photoClueFrame').classList.add('revealed');
    reaction.textContent='أيوه هي! كل لقطة لينا ليها عندي ذكرى حلوة ♡';card.querySelector('.photoMystery .actions').hidden=false;tone('win');
  });
  card.querySelector('[data-photo-go]').onclick=()=>next(300);
}

function mountSecretMarks(){
  const marks={3:['✦','الزر شهد إنك ركزتي في التفاصيل.'],13:['♡','الكروت بتقول إن ضحكتك أحلى من اللعبة.'],24:['☾','الموقع خبّى دي لك مخصوص… شكرًا إنك دورتي.']};
  const mark=marks[screen];if(!mark)return;
  const button=document.createElement('button');button.type='button';button.className='secretMark'+(extrasState.secrets.has(screen)?' found':'');
  button.textContent=mark[0];button.setAttribute('aria-label','سر صغير مخفي');button.title='جربي تضغطي';
  button.onclick=()=>{extrasState.secrets.add(screen);button.classList.add('found');say(mark[1],3200);tone('win')};
  card.querySelector('.screen')?.appendChild(button);
}
function bonusSecretMarkup(){
  return extrasState.secrets.size?'<div class="secretNote">ولأنك لقيتي سر في الطريق: حتى وأنا برخم عليكي، أكتر حاجة مستنيها هي ضحكتك لما توصلي هنا ♡</div>':'';
}
function certificateMarkup(){
  return '<section class="certificateCard"><div class="eyebrow">اعتماد رسمي من الموقع</div><h3>شهادة الصبر والفضول</h3><p>يا ضي، استحملتي الأزرار والاختبارات وطلبتي الهدية بكل إصرار. الشهادة دي تستاهلي تحتفظي بيها.</p><button type="button" class="btn hot" data-certificate>احفظي شهادتك كصورة</button></section>';
}
function certificateTitle(){
  return extrasState.answer==='wait'?'بطلة الصبر المزعوم':extrasState.answer==='ask'?'مديرة الاستفسارات العاجلة':'خبيرة معاينة الهدايا';
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
  ctx.font='600 32px RabieExact, Tahoma, sans-serif';ctx.fillText('اجتازت كل اختبارات الرخامة بنجاح',540,700);ctx.fillText('واستحملت موقعًا بيقول آخر حاجة كل شوية',540,762);
  ctx.fillStyle='#b12f71';ctx.font='800 70px RabieExact, Tahoma, sans-serif';ctx.fillText('♡ ✦ ♡',540,930);
  ctx.font='700 35px RabieExact, Tahoma, sans-serif';ctx.fillText('بكل حب — من أشرف',540,1090);
  ctx.font='600 22px RabieExact, Tahoma, sans-serif';ctx.fillText('مفاجأة ضي • شهادة قابلة للحفظ وممنوع الاعتراض عليها',540,1190);
  const link=document.createElement('a');link.download='diya-birthday-certificate.png';link.href=canvas.toDataURL('image/png');document.body.appendChild(link);link.click();link.remove();
}
function resetExtras(){extrasState.answer=null;extrasState.secrets.clear();extrasState.photoMistakes=0;extrasState.chatStep=0}
