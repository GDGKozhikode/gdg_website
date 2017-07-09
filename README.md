# GDG Kozhikode Website - Frontend
This is the frontend part of the GDG kozhikde wesite build with Google's [Material Design Lite](https://getmdl.io/)(MDL) & [Web Starter Kit](https://github.com/google/web-starter-kit).

## Features
* Responsive & work well across different device screen size
* Works as Prograssive Web App(PWA)
* Can save to homescreen & offline capability

### Note:
The MDL supporting files are loaded from cloud, so the site might won't paint the right way on the browser when try it offline.

<a name="toc"></a>
## Table of contents
0. [Prerequisites](#pre_req)
1. [Get the Code](#get_the_code)
2. [Run the Project](#run_project)
3. [Build & Optimize](#build_&_optimize)
4. [File Structure](#file_structure)
5. [Contribution](https://github.com/GDGKozhikode/gdg_website/blob/master/CONTRIBUTING.md)

<a name="pre_req"></a>
## Prerequisites [top](#toc)
#### [Node.js](https://nodejs.org)

Type `node --version` in your terminal to check if Node is installed.
Terminal will respond with a version **at or above 0.10.x**, if installed.
If not installed (*or need to upgrade*), go to [nodejs.org](https://nodejs.org) and click on the big green Install button.

#### [Gulp](http://gulpjs.com)

Type `gulp --version` in your terminal to check if Gulp is installed.
Terminal will return a version number **at or above 3.9.x**, if installed.
To install/upgrade Gulp, open up a terminal and type in the following:

```sh
$ npm install --global gulp
```

*This will install Gulp globally. Depending on your user account, you may need to [configure your system](https://github.com/sindresorhus/guides/blob/master/npm-global-without-sudo.md) to install packages globally without administrative privileges.*

<a name="get_the_code"></a>
## Get the code [top](#toc)
 [Download](https://github.com/GDGKozhikode/gdg_website/master/) / [Clone](https://github.com/GDGKozhikode/gdg_website.git) the repo.

 Open the download/cloned folder in your terminal.
 
```sh
$ cd ../gdg_website
```
### Local dependencies

Install the local dependencies that are requires:

```sh
$ npm install
```
<a name="run_project"></a>
## Run the project [top](#toc)
```sh
$ gulp serve
```

This outputs an IP address you can use to locally test and another that can be used on devices
connected to your network.
`serve` does not use [service worker](http://www.html5rocks.com/en/tutorials/service-worker/introduction/)
caching, so your site will stop being available when the web server stops running.

*Hot reload is in-built, so watch For changes & automatically refresh across devices everytime you save changes in the file(s).*

<a name="build_&_optimize"></a>
## Build & Optimize [top](#toc)

```sh
$ gulp
```

Build and optimize the current project, ready for deployment.
This includes linting as well as image, script, stylesheet and HTML optimization and minification.
Also, a [service worker](http://www.html5rocks.com/en/tutorials/service-worker/introduction/)
script will be automatically generated, which will take care of precaching your sites' resources.
On browsers that [support](https://jakearchibald.github.io/isserviceworkerready/) service
workers, the site will be loaded directly from the service worker cache, bypassing the server.
This means that this version of the site will work when the server isn't running or when there is
no network connectivity.

### Serve the Fully Built & Optimized Site

```sh
$ gulp serve:dist
```

This outputs an IP address you can use to locally test and another that can be used on devices
connected to your network.
`serve:dist` includes will serve a local copy of the built and optimized site generated as part
of the `default` task.
Because the optimized site includes a service worker which serves your site directly from the
cache, you will need to reload the page after regenerating the site to pick up the latest changes.
`serve:dist` uses a different HTTP port than `serve`, which means that the service workers are
kept isolated in different [scopes](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers#Registering_your_worker).

### Difference Between `serve` & `serve:dist`

It is important to note a difference between the `serve` and `serve:dist` tasks.

* `serve` uses a no-op `service-worker.js` and cannot run offline.
* `serve:dist` uses the `sw-precache`-generated output and can run offline.

The `serve` task runs on port 3000 and `serve:dist` runs on port 3001.
The main purpose is to ensure that different service workers will not impact each other's environment. 
Using the `sw-precache`-generated output makes it very difficult to quickly test local changes which is not ideal for a development server environment.

### Performance Insights

```sh
$ gulp pagespeed
```

Runs the deployed (public) version of your site against the [PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/) API to help you stay on top of where you can improve.


<a name="file_structure"></a>
## File Structure [top](#toc)

### app/index.html
This the main html file.

### app/images/
This is where all image files reside.

### app/scripts/

This is where the JavaScript files reside.

### app/styles/

This is where the custom CSS files are. You can place any __*.scss__ you wish to have & gulp task will compile it into __*.css__  in the `styles` directory.<br> Renaming `main.css` to `main.scss` will cause the file to treat as Sass.

### app/manifest.json

`manifest.json` contains a [Web Application Manifest](https://w3c.github.io/manifest/) - a simple JSON file that gives you the ability to control how your app appears to the user in the areas that they would expect to see apps (for example the mobile home screen). In here you can control what the user can launch and more importantly how they can launch it. 

### app/manifest.webapp

`manifest.webapp` refers to the proprietary [Firefox OS manifest format](https://developer.mozilla.org/en-US/Apps/Build/Manifest), and not the W3C [manifest spec](https://w3c.github.io/manifest/), designed for cross-browser open web applications. 

The Firefox OS app manifest provides information about an app (such as name, author, icon, and description) and a list of Web APIs that your app needs.

### app/service-worker.js

A [service worker](http://www.html5rocks.com/en/tutorials/service-worker/introduction/) is a script that is run by your browser in the background, separate from a web page, opening the door to features such as offline support.

### app/humans.txt
 File that contains information about the different people who have contributed to building the website.[Read More](http://humanstxt.org/)

### app/robots.txt
Instructions about the site to web robots.[Read More](http://www.robotstxt.org/)
### .babelrc

[.babelrc](https://babeljs.io/docs/usage/babelrc/) is a configuration file for passing options to [Babel](https://babeljs.io) - the ES2015 transpiler recommended for writing next-generation JavaScript.

### .editorconfig

[EditorConfig](http://editorconfig.org/) is a file format and collection of text editor plugins for maintaining consistent coding styles between different editors and IDEs.

### .gitignore
Contain files & folders for git to avoid tracking such as Node Modules, .tmp/, dist/ etc.

### gulpfile.babel.js

[Gulp](http://gulpjs.com) is a streaming build system that allows you to automate tedious development tasks. Compared with other build systems, such as Grunt, gulp uses Node.js streams as a means to automate tasks, thereby removing the need to create intermediate files when transforming source files. 

In gulp, you would install plugins, that do one thing and do it well, and construct a 'pipeline' by connecting them to each other. A `gulpfile` allows you to put together tasks that use plugins to accomplish a task like minification. 

`gulpfile.babel.js` is a gulpfile written in ES2015. The `babel` portion of the name refers to its use of the [Babel](https://babeljs.io) transpiler for enabling ES2015 code to run there.

### README.md
This is the file your reading now ;). Written in Markdown language.

### CONTRIBUTING.md
[Open](https://github.com/GDGKozhikode/gdg_website/blob/master/CONTRIBUTING.md) the file to see how to participate & contribute to the project.