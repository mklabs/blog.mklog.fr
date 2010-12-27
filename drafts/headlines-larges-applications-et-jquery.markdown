Title: Large application et jQuery
Author: Mickael Daniel
Date: Dec 27 2010 12:00:00 GMT-0500 (CDT)
Categories: Javascript, jQuery
Translation: This article is the french translation of excellent Addy osmani's post[http://addyosmani.com/blog/large-scale-jquery/](http://addyosmani.com/blog/large-scale-jquery/)
Tags: Code org., Webapp Architecture, jQuery

Guidelines pour l'écriture d'un post sur la conception de larges web applications utilisant jQuery. Inspiré par l'article incroyable d'Addy Osmani: [Building Large-Scale jQuery Applications](http://addyosmani.com/blog/large-scale-jquery/)

## Dependency Management
## MVC & Organization For Large-Scale jQuery Applications
## Templating
## Communication Between Modules
## Build Process & Script Concatenation
## Script Minification
## Testing

## Dependency Management

* RequireJS – http://requirejs.org/docs/jquery.html
* LabJS – http://www.labjs.com (and checkout YepNope JS, an excellent conditional loader that works on top of LabJS by Alex Sexton - http://www.yepnopejs.com).
* StealJS – http://jupiterjs.com/news/stealjs-script-manager
* JSL Script Loader – http://www.andresvidal.com/jsl
* Bootstrap - https://bitbucket.org/scott_koon/bootstrap
 

## MVC & Organization For Large-Scale jQuery Applications

* JavaScriptMVC *(Recommended)* Mature MVC solution which includes testing, dependency management, build tools, client side templates. Perfect for large applications where an all-in-one solution for organizing and building code is required. Most recently used by Grooveshark in their app re-write.
Video Preview: http://cdn.javascriptmvc.com/videos/2_0/2_0_demo.htm
Demos and download:
 http://www.javascriptmvc.com/#&who=getcode
https://github.com/jupiterjs/srchr

* Backbone: Excellent for a DIY MVC Solution where you select the additional components you feel work best for your project. Backbone provides the ‘backbone’ you need to organize your code using the MVC pattern (but bare in mind that here the C in MVC stands for Collections and not Controllers). It’s great because it basically a provides a small framework ?(~2Kb) that provides the core pieces of KVO bindings.
Demos and download:
http://documentcloud.github.com/backbone/
http://ryandotsmith.heroku.com/2010/10/a-backbone-js-demo-app-sinatra-backend.html
http://documentcloud.github.com/backbone/docs/todos.html
http://bennolan.com/2010/11/24/backbone-jquery-demo.html

* SproutCore
As it runs in the browser, SproutCore extends MVC to include a server interface, a display that ‘paints’ your interface and responders for controlling application state. Yeduha Katz who is heavily involved in the project is also working on adding modularity to SC and this option should also be available soon. Recommended for applications wishing to have a desktop-like ‘richness’. Considered overkill for smaller-sized apps. Used by Apple amongst others.
Video preview: http://vimeo.com/16774060
Demos and download:
http://wiki.sproutcore.com/w/page/12412938/Hello-World-Tutorial
http://www.sproutcore.com/get-started/

* Knockout JS 
Uses MVVM (which can be considered as MVC with declarative syntax). It’s very much catered to those using JavaScript for user interfaces but does also provide dependency management, templating and works well with jQuery. May require a learning curve to get around the heavy use of data-binding.
Demos and download:
http://knockoutjs.com/documentation/introduction.htm
http://knockoutjs.com/examples/

* Eyeballs JS
An MVC framework by Paul Campbell who is well known for his involvement with Ruby. Eyeballs works with many libraries but provides a layer of features for organising your code – it aims to be both agnostic and modular. About on par with Backbone. A trivial note but it’s initialization function (o_O()) may be a offputting to some. Above all, Eyeballs has quite a familiar feeling if you’re a Ruby developer and I would recommend checking it out if you primarily use Ruby for building the server-side code to your web applications.
Demos and download:
https://github.com/paulca/eyeballs.js

* Sammy JS
Sammy.js is a lightweight jQuery plugin which allows you to easily define ‘route’ based applications. Where the C in MVC stands for Controller, some would consider Sammy.js the best controller framework out there but it doesn’t exactly provide the Model and View aspects itself. Sammy is still worth checking out for single page JS apps requiring a level of organization.
Demos and download:
https://github.com/quirkey/sammy

* Choco
A decent looking MVC solution but needs some polish. Based on Sammy and JS-Model but comes with clean support for generators and is easily extensible.
Video Preview: http://www.2dconcept.com/images/choco.mov
Get:  https://github.com/ahe/choco



* Additional pattern resources for large-scale jQuery applications:
John Resig’s Simple Inheritence
Using Inheritence Patterns To Organize Large jQuery Apps with Alex Sexton
The Object Literal pattern recommended by Rebecca Murphy


## Templating

* jQuery-tmpl http://github.com/jquery/jquery-tmpl (tutorial video here)
* Mustache.js https://github.com/janl/mustache.js (tutorial video here)
* Dust.js (one of Alex’s recommendations) - http://akdubya.github.com/dustjs/
* Handlebars by Yehuda Katz (an extension to Mustache) - https://github.com/wycats/handlebars.js (I’m warming up to this option)
* jQote http://aefxx.com/jquery-plugins/jqote/
* PURE http://beebole.com/pure/index.html
* Nano https://github.com/trix/nano
 

## Communication Between Modules

* Ben Alman’s pub/sub on GitHub (this updated version contains two variations)
* @phiggins jQuery.pubsub
* PubSubJS
* An Introduction To jQuery Custom Events
* jsSignals – Custom Events/Messaging for jQuery
 

## Build Process & Script Concatenation

* Sprockets Ruby library for preprocessing and concatenating JavaScript source files http://getsprockets.org/ 

* Combine and concatonate JavaScript files using Ant and YUI Compressor. http://www.samaxes.com/2009/05/combine-and-minimize-javascript-and-css-files-for-faster-loading/ and http://www.javascriptr.com/2009/07/21/setting-up-a-javascript-build-process/

* Using Google Closure Compiler for compile JS applictions with Ant http://groups.google.com/group/closure-compiler-discuss/browse_thread/thread/92278e7a84736f3c

* Programatically concatenating files using only Ant http://stackoverflow.com/questions/1373564/how-to-programmaticly-concatenate-with-ant

* Concatonate files with MVC and .NET http://www.codeplex.com/MvcScriptManager

* Smasher - Smasher is a PHP5 application based on an internal tool used by Yahoo! Search. It combines multiple JavaScript files, preprocesses them, and optionally minifies their content. http://github.com/jlecomte/smasher

* Jake (used with Cappuccino): http://cappuccino.org/discuss/2010/04/28/introducing-jake-a-build-tool-for-javascript/
 

## Script Minification

* Google Closure Compiler http://code.google.com/closure/compiler/
* YUI Compressor http://developer.yahoo.com/yui/compressor/ (and automating this with Packer here)
* Minifier http://aspnet.codeplex.com/Release/ProjectReleases.aspx?ReleaseId=34488
* UglifyJS * (Recommended as it shows promising minification gains on the others) https://github.com/mishoo/cl-uglify-js
* Packer for .NET http://svn.offwhite.net/trac/SmallSharpTools.Packer/wiki
* Dojo Toolkit’s ShrinkSafe http://www.dojotoolkit.org/
* JSMin – The JavaScript minifier http://www.crockford.com/javascript/jsmin.html
 

## Testing

* Unit Tests For Your JavaScript/jQuery Code Using QUnit http://net.tutsplus.com/tutorials/javascript-ajax/how-to-test-your-javascript-code-with-qunit/

* Unit Testing With FuncUnit From JavaScriptMVC
http://jupiterjs.com/news/funcunit-fun-web-application-testing

* Mock Your Ajax Requests with MockJax & jQuery for Rapid Development
http://enterprisejquery.com/2010/07/mock-your-ajax-requests-with-mockjax-for-rapid-development/

* Getting Started With Test-Driven Development For jQuery
http://msdn.microsoft.com/en-us/scriptjunkie/ff452703.aspx

* John Resig recommends WebDriver (Java), Watir (Ruby) and JSTestDriver. Selenium RC.

* Debugging And Testing JavaScript In A Scripting Environment With Envjs and BumbleBee

* jQuery Driven Automated User Interface Testing
https://github.com/mennovanslooten/UITest


 

Further Reading & Resources

* On jQuery and large applications with Rebecca Murphy
* On ‘Rolling Your Own’ Large jQuery Apps with Alex Sexton
* jQuery UI Developer’s Guide (for those wishing to use $.widget etc)
* Nicholas Zakas – Scalable JavaScript Application Architecture
* Tech Behind The New GrooveShark (Good Article On Large Scale jQuery App Dev)
* Cody Lindley’s excellent list of client-side development links for app development
* JavaScript Documentation Tools: JSDoc, YUI Doc or PDoc