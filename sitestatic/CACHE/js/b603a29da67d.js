(function(){var getRequest,getStartRequest;getRequest=function(){return{events:[]};};getStartRequest=function(){var request,scope;scope=$("#ctlr").data('$scope');request=getRequest();request['trigger']={type:"manual",contact:{uuid:uuid(),name:contactName,urns:["tel:+12065551212"]},flow:{uuid:scope.flow.metadata.uuid,name:scope.flow.metadata.name},triggered_on:new Date()};return request;};window.simStart=function(){var request;window.session=null;window.resetForm();request=getStartRequest();return $.post(getSimulateURL(),JSON.stringify(request)).done(function(results){var scope;window.session=results.session;$(".simulator-body").html("");scope=$("#ctlr").data('$scope');window.addMessage("Entering the flow \""+scope.flow.metadata.name+"\"","log");return window.updateResults(results);});};window.sendUpdate=function(postData){var request;request=getRequest();request['session']=window.session;request['events']=[{type:"msg_received",msg:{text:postData.new_message,uuid:uuid(),urn:"tel:+12065551212",created_on:new Date()},created_on:new Date(),contact:window.session.contact}];return $.post(getSimulateURL(),JSON.stringify(request)).done(function(results){window.session=results.session;window.updateResults(results);return window.resetForm();});};window.showModal=function(title,body){var modal;modal=new ConfirmationModal(title,body);modal.show();return modal;};window.updateResults=function(data){var activity,event,group,i,j,k,key,l,lastExit,legacyFormat,len,len1,len2,len3,len4,m,ref,ref1,ref2,ref3,ref4,run,scope,segment,slugged,visited,webhookEvent;if(data.events){ref=data.events;for(i=0,len=ref.length;i<len;i++){event=ref[i];if(event.type==="broadcast_created"){window.addMessage(event.text,"MT");}else if(event.type==="msg_created"){window.addMessage(event.msg.text,"MT");}else if(event.type==="flow_triggered"){window.addMessage("Entering the flow \""+event.flow.name+"\"","log");}else if(event.type==="run_result_changed"){slugged=event.name.toLowerCase().replace(/([^a-z0-9]+)/g,'_');window.addMessage("Saving @flow."+slugged+" as \""+event.value+"\"","log");}else if(event.type==="contact_language_changed"){window.addMessage("Updated language to \""+event.language+"\"","log");}else if(event.type==="contact_name_changed"){window.addMessage("Updated name to \""+event.name+"\"","log");}else if(event.type==="contact_field_changed"){window.addMessage("Updated "+event.field.label+" to \""+event.value+"\"","log");}else if(event.type==="contact_group_added"){ref1=event.groups;for(j=0,len1=ref1.length;j<len1;j++){group=ref1[j];window.addMessage("Added to group \""+group.name+"\"","log");}}else if(event.type==="contact_group_removed"){ref2=event.groups;for(k=0,len2=ref2.length;k<len2;k++){group=ref2[k];window.addMessage("Removed from group \""+group.name+"\"","log");}}else if(event.type==="webhook_called"){if(event.status_code){webhookEvent=event;window.addMessage("Called "+event.url+" which returned a "+event.status_code+" response.","log",null,null,function(){var modal;modal=showModal("Webhook Results","<pre>"+webhookEvent.response+"</pre>");modal.setListeners({},true);return modal.hideSecondaryButton();});}else{window.addMessage("Couldn't reach "+event.url,"log");}}else if(event.type==="error"){window.addMessage(event.text,'error');if(event.fatal){$('#simulator').addClass('disabled');}}}}
$(".simulator-body").scrollTop($(".simulator-body")[0].scrollHeight);$("#simulator textarea").val("");if(data.session){if(data.session.status==='completed'){scope=$("#ctlr").data('$scope');window.addMessage("Exited the flow \""+scope.flow.metadata.name+"\"","log");$('#simulator').addClass('disabled');}
visited={};lastExit=null;ref3=data.session.runs;for(l=0,len3=ref3.length;l<len3;l++){run=ref3[l];ref4=run.path;for(m=0,len4=ref4.length;m<len4;m++){segment=ref4[m];if(lastExit){key=lastExit+':'+segment.node_uuid;if(!(key in visited)){visited[key]=0;}
visited[key]=visited[key]+1;}
lastExit=segment.exit_uuid;activity={};activity[segment.node_uuid]=1;}}
legacyFormat={'activity':activity,'visited':visited};return updateActivity(legacyFormat);}};}).call(this);