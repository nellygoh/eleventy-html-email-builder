# HTML Email Builder with Eleventy

## 🧐 About

Static HTML email builder with [Eleventy](https://www.11ty.dev/) site generator and [Handlebars](https://handlebarsjs.com/) templating language. Besides handlebars, eleventy also supports other several popular template languages, more information can be found in their [documentation page](https://www.11ty.dev/docs/languages/). This builder can supports multiple project with different layout and branding.

## 🏁 Getting Started

### 1. Clone the project 

~~~bash  
  git clone https://github.com/nellygoh/eleventy-html-email-builder.git my-project-name
~~~

### 2. Go to the project directory  

~~~bash  
  cd my-project-name
~~~

### 3. Install dependencies  

~~~bash  
npm install
~~~

## 🗀 Project and folder management 
To create a new project, create a subfolder under of each `.\emails`, `.\src\_includes\content`, and `.\src\scss` folders. Make sure to use the same name. Use 'demo' project for reference.

#### `emails\`

This is where the base html email files is. The name of the file here will be also the name of your file output. For example `index.hbs` file will create a `index.html` file in your project folder under `output\` folder. Each of the hbs file can have their own data file in json format. This is optional, you can also just hardcode the link into your content. The data file will be very useful when you want to create resuable components or blocks. 

#### `lib\`
You can add more custom libraries or helpers here. In this project, I added a few hbs helpers for the demo

#### `output\`
This is where your static html project file is located.

#### `src\_includes\content\`
The main body content of the project email will be under this folder. You can name the file however you like. Just make sure your base email file is the right file name. For example using the 'demo' project as reference, if you rename the `demo_content.hbs` to `another_demo_content.hbs`, then in `emails\demo\index.hbs` file you would want to replace `{{> content/demo/demo_content}}` to `{{> content/demo/another_demo_content}}`. 

#### `src\_includes\css\`
This is where the all the css files are located.

#### `src\_includes\layouts\`
The base skeleton of your html file is here. You can create several custom layouts in this folder. To point to your custom base layout, replace the layout value in your base html email file to your custom layout name. For example: `layout: layouts/base.njk` to `layout: layouts/custom-base.njk`.

#### `src\_includes\partials\`
This system is using Modular Email Design, by creating several self-contained components that can be stacked, rearranged, and/or removed. It's like building lego blocks. The goal is to be able to quickly apply a different design pattern without changing or rewriting the whole system. Partials in here are that self-contained components. You can create your own partials component here, and reuse them in different places.

#### `src\scss\`
This builder is using Sass by default, but you may choose to switch to vanilla css. The reason of using Sass is to organize the files better, and its biggest benefit of the ability to use variables. To switch to vanilla css, you will have to tweak the `eleventy.js` and npm script accordingly.

#### `.env`
Duplicate `.env-sample` and rename it to `.env`. Change the value of `PROJECT` variable to the folder name that you're working on. 

## 🚀 Generate Output
Run the command below to build and watch the file changes. Open `http://localhost:8080/` to preview the html. There's a built-in live reload to refresh the page when file is regenerated.
~~~bash  
npm run start
~~~

To run and generate the final file output
~~~bash  
npm run build
~~~

## 🗈 Notes
- [Volta](https://docs.volta.sh/guide) is also used here to for consitent development environments and remove the hassle of switching between node version.

- To switch from Sass to vanilla css, you will need to update the `eleventy.js` and npm script command. 
