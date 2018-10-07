(function(){var app;app=angular.module('temba.directives',['temba.services']);app.directive("node",["Plumb","Flow","DragHelper","utils","$timeout","$log",function(Plumb,Flow,DragHelper,utils,$timeout,$log){var link;link=function(scope,element,attrs){if(window.mutable){Plumb.makeTarget(attrs.id,attrs.dropScope);$timeout(function(){return jsPlumb.draggable(attrs.id,{containment:true,cancel:'.source',start:function(){DragHelper.hide();element.data('previous',element.offset());element.parents('#flow').addClass('dragging');element.addClass('dragging');return window.dragging=true;},drag:function(){utils.checkCollisions(element);return $(this).find("._jsPlumb_endpoint_anchor_").each(function(i,e){if($(e).hasClass("connect")){Plumb.repaint($(e).parent());}else{Plumb.repaint($(e));}});},stop:function(){element.parents('#flow').removeClass('dragging');element.removeClass('dragging');if(element.hasClass('collision')&&element.data('previous')){element.offset(element.data('previous'));element.data('previous',null);element.removeClass('collision');return Plumb.repaint();}else{scope.node.x=element[0].offsetLeft;scope.node.y=element[0].offsetTop;Flow.determineFlowStart();Plumb.setPageHeight();return $timeout(function(){window.dragging=false;return Flow.markDirty();},0);}}});},0);return scope.$on('$destroy',function(){return Plumb.removeElement(scope.node.uuid);});}};return{restrict:"A",scope:{node:'='},link:link};}]);app.directive("note",["$timeout","$log","Flow",function($timeout,$log,Flow){var link;link=function(scope,element,attrs){element.css('left',scope.note.x+'px').css('top',scope.note.y+'px');element.draggable({containment:'parent',stop:function(){scope.note.x=element[0].offsetLeft;scope.note.y=element[0].offsetTop;return $timeout(function(){return Flow.markDirty();},0);}});scope.$watch('note.title',function(current,prev){if(current!==prev){return Flow.markDirty();}});return scope.$watch('note.body',function(current,prev){if(current!==prev){return Flow.markDirty();}});};return{restrict:"A",scope:{note:'='},link:link};}]);app.directive("actionset",["$timeout","$log","Plumb","Flow",function($timeout,$log,Plumb,Flow){var link;link=function(scope,element,attrs){Plumb.updateConnection(scope.actionset);Flow.checkTerminal(scope.actionset);scope.addAction=function(){};return scope.$watch((function(){return scope.actionset._terminal;}),function(terminal){var source;if(terminal==null){terminal=false;}
source=$('#'+scope.actionset.uuid+' .source');if(terminal){source.addClass('terminal');Flow.updateDestination(scope.actionset.uuid,null);}else{source.removeClass('terminal');}
return $timeout(function(){return jsPlumb.setSourceEnabled(scope.actionset.uuid+'_source',!terminal);},0);});};return{link:link,scope:{actionset:'='}};}]);app.directive("action",["Plumb","Flow","$log",function(Plumb,Flow,$log){var link;link=function(scope,element,attrs){scope.updateTranslationStatus=function(action,baseLanguage,currentLanguage){var iso_code,mime_parts,parts,ref;action._missingTranslation=false;iso_code=Flow.flow.base_language;if(currentLanguage){iso_code=currentLanguage.iso_code;}
if((ref=action.type)==='send'||ref==='reply'||ref==='say'||ref==='end_ussd'){action._translation=action.msg[iso_code];if(action.recording){action._translation_recording=action.recording[iso_code];if(action._translation_recording){action._translation_recording=window.mediaURL+action._translation_recording;}}
action._media=null;action._attachURL=null;if(action.media&&action.media[iso_code]){parts=action.media[iso_code].split(/:(.+)/);if(parts.length>=2){mime_parts=parts[0].split('/');if(mime_parts.length>1){action._media={mime:parts[0],url:window.mediaURL+parts[1],type:mime_parts[0]};}else{action._attachURL=parts[1];action._attachType=mime_parts[0];}}}
if(action._translation===void 0){action._translation=action.msg[baseLanguage];action._missingTranslation=true;}else{action._missingTranslation=false;}}else{action._translation=null;action._missingTranslation=false;}
Flow.updateTranslationStats();return Plumb.repaint(element.parents('.node').find('.source'));};scope.$watch((function(){return scope.action.dirty;}),function(current){if(current){scope.action.dirty=false;return scope.updateTranslationStatus(scope.action,Flow.flow.base_language,Flow.language);}});scope.$watch((function(){return scope.action;}),function(){return scope.updateTranslationStatus(scope.action,Flow.flow.base_language,Flow.language);});return scope.$watch((function(){return Flow.language;}),function(){return scope.updateTranslationStatus(scope.action,Flow.flow.base_language,Flow.language);});};return{restrict:"A",link:link,scope:{action:'=action'}};}]);app.directive("actionName",["Flow",function(Flow){var link;link=function(scope,element,attrs){return scope.$watch((function(){return scope.ngModel;}),function(){var actionConfig;if(scope.ngModel){actionConfig=Flow.getActionConfig(scope.ngModel);scope.name=actionConfig.name;if(attrs['icon']==="show"){return scope.icon=actionConfig.icon;}}});};return{template:'<span class="icon [[icon]]"></span><span>[[name]]</span>',restrict:"C",link:link,scope:{ngModel:'='}};}]);app.directive("rulesetName",["Flow",function(Flow){var link;link=function(scope,element,attrs){return scope.$watch((function(){return scope.ngModel;}),function(){var rulesetConfig;if(scope.ngModel){rulesetConfig=Flow.getRulesetConfig(scope.ngModel);scope.name=rulesetConfig.name;if(attrs['icon']==="show"){return scope.icon=rulesetConfig.icon;}}});};return{template:'<span class="icon [[icon]]"></span><span>[[name]]</span>',restrict:"C",link:link,scope:{ngModel:'='}};}]);app.directive("ruleset",["Plumb","Flow","$log",function(Plumb,Flow,$log){var link;link=function(scope,element,attrs){Flow.replaceRuleset(scope.ruleset,false);scope.updateTranslationStatus=function(ruleset,baseLanguage,currentLanguage){var category,iso_code,item,j,k,len,len1,ref,ref1;iso_code=baseLanguage;if(currentLanguage){iso_code=currentLanguage.iso_code;}
ref=ruleset._categories;for(j=0,len=ref.length;j<len;j++){category=ref[j];category._missingTranslation=false;if(category.name){if(baseLanguage){category._translation=category.name[iso_code];if(category._translation===void 0){category._translation=category.name[baseLanguage];category._missingTranslation=true;}else{category._missingTranslation=false;}}else{category._translation=category.name;}}}
if(Flow.flow.flow_type==='U'){ruleset.config._ussd_translation=ruleset.config.ussd_message[iso_code];if(ruleset.config._ussd_translation===void 0||ruleset.config._ussd_translation===""){ruleset.config._ussd_translation=ruleset.config.ussd_message[baseLanguage];ruleset.config._missingTranslation=true;}else{ruleset.config._missingTranslation=false;}
if(ruleset.ruleset_type==="wait_menu"){ref1=ruleset.rules;for(k=0,len1=ref1.length;k<len1;k++){item=ref1[k];item._missingTranslation=false;if(item.label){item._translation=item.label[iso_code];if(item._translation===void 0||item._translation===""){item._translation=item.label[baseLanguage];item._missingTranslation=true;}}}}}
Flow.updateTranslationStats();return Plumb.repaint(element);};scope.$watch((function(){return scope.ruleset;}),function(){scope.updateTranslationStatus(scope.ruleset,Flow.flow.base_language,Flow.language);return Plumb.updateConnections(scope.ruleset);});return scope.$watch((function(){return Flow.language;}),function(){return scope.updateTranslationStatus(scope.ruleset,Flow.flow.base_language,Flow.language);});};return{restrict:"A",link:link,scope:{ruleset:'=ruleset'}};}]);app.directive("operatorName",["Flow",function(Flow){var link;link=function(scope,element,attrs){return scope.$watch((function(){return scope.ngModel;}),function(){var opConfig;opConfig=Flow.getOperatorConfig(scope.ngModel.type);return scope.verbose_name=opConfig.verbose_name;});};return{template:'<span>[[verbose_name]]</span>',restrict:"C",link:link,scope:{ngModel:'='}};}]);app.directive("source",['Plumb','$log',function(Plumb,$log){var link;link=function(scope,element,attrs){if(!attrs.id||!attrs.dropScope){return;}
if(window.mutable){Plumb.makeSource(attrs.id,attrs.dropScope);}
return scope.$on('$destroy',function(){if(jsPlumb.isSource(attrs.id)){return Plumb.removeElement(attrs.id);}});};return{link:link,restrict:'C'};}]);}).call(this);