(function(){var appendMessage,checkForm,fitSimToScreen,hideSimulator,initSimulatorBody,initTextareaHeight,processForm,resetSimulator,resized,sendAudio,sendGPS,sendMessage,sendPhoto,sendVideo,showSimulator,toExpand,verifyNumberSimulator;window.simulation=false;window.moving_sim=false;window.level_classes={"I":"iinfo","W":"iwarn","E":"ierror"};window.legacy=true;$(function(){return $(window).scroll(function(evt){return fitSimToScreen();});});toExpand=$("#simulator textarea");initTextareaHeight=toExpand.height();initSimulatorBody=$(".simulator-body").height();resized=toExpand.height();toExpand.autosize({callback:function(){var currentResized,footer;currentResized=toExpand.height();if(currentResized!==resized){footer=currentResized+10;resized=currentResized;$(".simulator-footer").css("height",footer);$(".simulator-body").css("height",initSimulatorBody-footer+30);return $(".simulator-body").scrollTop($(".simulator-body")[0].scrollHeight);}}});checkForm=function(newMessage){var valid;valid=true;if(newMessage===""){$("#simulator textarea").addClass("error");valid=false;}else if(newMessage.length>160){$("#simulator textarea").val("");$("#simulator textarea").addClass("error");valid=false;}
toExpand.css("height",initTextareaHeight);$(".simulator-footer").css("height",initTextareaHeight+10);$(".simulator-body").css("height","360px");return valid;};window.resetForm=function(){$('.simulator-footer .media-button').hide();$('.simulator-footer .imessage').show();$("#simulator textarea").val("");$(".simulator-loading").css("display","none");$(".simulator-body").css("height","360px");return $("#simulator textarea").removeClass("error");};processForm=function(postData){var scope;scope=$('html').scope('scope');if(scope&&scope.saving){setTimeout(function(){return processForm(postData);},500);return;}
if(window.legacy){return window.sendUpdateLegacy(postData);}else{return window.sendUpdate(postData);}};window.sendSimulationMessage=function(new_message){return sendMessage(new_message);};sendMessage=function(newMessage){if(checkForm(newMessage)){if(newMessage==="/v1"||newMessage==="/v2"){window.legacy=newMessage==="/v1";if(newMessage==="/v2"){document.location.href=document.location.href.replace(/\/editor\//g,'/editor_next/');return;}
resetForm();setTimeout(function(){resetSimulator();if(window.legacy){return $('.simulator-content').removeClass('v2');}},500);return false;}
processForm({new_message:newMessage});return true;}};sendPhoto=function(){return processForm({new_photo:true});};sendVideo=function(){return processForm({new_video:true});};sendAudio=function(){return processForm({new_audio:true});};sendGPS=function(){return processForm({new_gps:true});};fitSimToScreen=function(){var showSim,sim,simBottom,simTop,top,workspace,workspaceBottom;top=$(window).scrollTop();sim=$("#simulator");workspace=$("#workspace");showSim=$("#show-simulator");if(top>110&&!sim.hasClass('scrollfix')){sim.addClass('scrollfix');showSim.addClass('scrollfix');}else if(top<=110&&sim.hasClass('scrollfix')){sim.removeClass('scrollfix');showSim.removeClass('scrollfix');}
simTop=sim.offset().top;simBottom=sim.height()+simTop;workspaceBottom=workspace.offset().top+workspace.height();if(simTop>top+10&&sim.hasClass('on-footer')){return sim.removeClass('on-footer');}else{if(simBottom>workspaceBottom-30&&!sim.hasClass('on-footer')){sim.addClass('on-footer');}
if(simBottom<workspaceBottom&&sim.hasClass('on-footer')){return sim.removeClass('on-footer');}}};window.updateActivity=function(data){var activity,i,len,node,ref,scope,top;if(window.simulation){scope=$('body').scope();if(scope){scope.$apply(function(){return scope.visibleActivity={active:data.activity,visited:data.visited};});}
ref=$('#workspace').children('.node');for(i=0,len=ref.length;i<len;i++){node=ref[i];node=$(node).data('object');node.setActivity(data);}}
activity=$('.activity:visible,.node .active:visible');if(activity){if(activity.offset()){top=activity.offset().top;return $('html, body').animate({scrollTop:top-200});}}};hideSimulator=function(){var moving_sim,scope,sim;moving_sim=true;sim=$("#simulator");sim.animate({right:-(sim.outerWidth()+10)},400,"easeOutExpo",function(){var showButton;sim.hide();showButton=$("#show-simulator");showButton.css({right:-(showButton.outerWidth()+10)});showButton.show();showButton.stop().animate({right:0,width:40},400,"easeOutExpo");return moving_sim=false;});window.simulation=false;$("#toolbar .actions").fadeIn();scope=$('body').scope();if(scope){scope.$apply(function(){return scope.visibleActivity=scope.activity;});}
if(window.is_voice){return window.hangup();}};showSimulator=function(reset){var messageCount;if(reset==null){reset=false;}
messageCount=$(".simulator-body").data('message-count');if(reset||!messageCount||messageCount===0){resetSimulator();}else{refreshSimulator();}
window.moving_sim=true;fitSimToScreen();$("#toolbar .actions").fadeOut();$("#show-simulator").stop().animate({right:'-110px'},200,function(){var sim;$(this).hide();$(this).find('.message').hide();sim=$("#simulator");sim.css({right:-(sim.outerWidth()+10)});sim.show();return sim.animate({right:30},400,"easeOutExpo",function(){$(".simulator-content textarea").focus();return window.moving_sim=false;});});return window.simulation=true;};window.refreshSimulator=function(){var scope;scope=$('html').scope('scope');if(scope&&scope.saving){setTimeout(refreshSimulator,500);return;}
if(window.legacy){return window.simStartLegacy();}else{return window.simStart();}};resetSimulator=function(){var scope;$('#simulator').removeClass('disabled');$(".simulator-body").html("");$(".simulator-body").append("<div class='ilog from'>One moment..</div>");$(".simulator-loading").css("display","none");$('.simulator-footer .media-button').hide();$('.simulator-footer .imessage').hide();scope=$('html').scope('scope');if(scope&&scope.saving){setTimeout(resetSimulator,500);return;}
if(window.legacy){return window.simStartLegacy();}else{return window.simStart();}};window.hangup=function(){$(".simulator-body").html("");return $.post(getSimulateURL(),JSON.stringify({hangup:true})).done(function(data){});};window.addMessage=function(text,type,metadata,level,onClick){var classes,ele;if(metadata==null){metadata=null;}
if(level==null){level=null;}
if(onClick==null){onClick=null;}
classes=["imsg"];if(type==="log"||type==="error"){classes=["ilog"];}
if(type==="MO"){classes.push("to");}else if(type==="MT"){classes.push("from");}else if(type==="error"){classes.push("ierror");}
if(level){classes.push(level_classes[level]);}
if(onClick){classes.push("link");}
ele="<div class=\""+classes.join(" ")+"\">";ele+=text;ele+="</div>";ele=$(ele);if(onClick){ele.bind("click",onClick);}
return ele=$(".simulator-body").append(ele);};appendMessage=function(newMessage,ussd){var imsgDiv;if(ussd==null){ussd=false;}
ussd=ussd?"ussd ":"";imsgDiv='<div class=\"imsg '+ussd+'to post-message\"></div>';$(imsgDiv).text(newMessage).appendTo(".simulator-body");$("#simulator textarea").val("");$(".simulator-loading").css("display","block");return $(".simulator-body").scrollTop($(".simulator-body")[0].scrollHeight);};$('#simulator .gps-button').on('click',function(){return sendGPS();});$('#simulator .photo-button').on('click',function(){return sendPhoto();});$('#simulator .video-button').on('click',function(){return sendVideo();});$('#simulator .audio-button').on('click',function(){return sendAudio();});$("#simulator .send-message").on("click",function(){var newMessage;newMessage=$("#simulator textarea").val();$(this).addClass("to-ignore");if(sendMessage(newMessage)){if(window.ussd&&newMessage.length<=182){return appendMessage(newMessage,true);}else if(newMessage.length<=160&&newMessage.length>0){return appendMessage(newMessage);}}});$("#simulator textarea").keypress(function(event){var newMessage;if(event.which===13){event.preventDefault();newMessage=$("#simulator textarea").val();if(sendMessage(newMessage)){if(newMessage){if(window.ussd&&newMessage.length<=182){return appendMessage(newMessage,true);}else if(newMessage.length<=160){return appendMessage(newMessage);}}}}});$("#show-simulator").hover(function(){if(!window.moving_sim){return $(this).stop().animate({width:'110px'},200,"easeOutBack",function(){return $(this).find('.message').stop().fadeIn('fast');});}},function(){if(!window.moving_sim){$(this).find('.message').hide();return $(this).stop().animate({width:'40px'},200,"easeOutBack",function(){});}});verifyNumberSimulator=function(){var modal;if(window.ivr){modal=new Modax(gettext("Start Test Call"),'/usersettings/phone/');modal.setIcon("icon-phone");modal.setListeners({onSuccess:function(){return showSimulator(true);}});return modal.show();}else if(window.ussd&&!window.has_ussd_channel){modal=new Modal(gettext("Missing USSD Channel"),gettext("There is no channel that supports USSD connected. Please connect a USSD channel first."));modal.setIcon("icon-phone");modal.setListeners({onPrimary:function(){return modal.dismiss();}});return modal.show();}else{return showSimulator();}};$("#show-simulator").click(function(){return verifyNumberSimulator();});$("#toggle-simulator").on("click",function(){if(!$("#simulator").is(":visible")){return verifyNumberSimulator();}else{return hideSimulator();}});$(".simulator-close").on("click",function(){return hideSimulator();});$(".simulator-refresh").on("click",function(){return resetSimulator();});}).call(this);