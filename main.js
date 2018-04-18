// Copyright 2018 (c) Arne Köhn <arne@chark.eu>
// 
// Distributed under the terms of the MIT License.

var annodoc_root = '/nbextensions/jupyter-annodoc/annodoc/';

var webFontURLs = [
	// annodoc_root + 'static/fonts/PT_Sans-Caption-Web-Regular.ttf',
	annodoc_root + 'static/fonts/Liberation_Sans-Regular.ttf'
];

define([
    'base/js/namespace',
    'jquery',
    'require',
    'notebook/js/textcell',
    'base/js/utils',

	// we ship our own jquery-svg as the one used by annodoc is too old.
	'/nbextensions/jupyter-annodoc/jquery.svg.min.js',
	'/nbextensions/jupyter-annodoc/jquery.svgdom.min.js',

	annodoc_root + 'lib/ext/waypoints.min.js',
		
	// brat helper modules
	annodoc_root + 'lib/brat/configuration.js',
	annodoc_root + 'lib/brat/util.js',
	annodoc_root + 'lib/brat/annotation_log.js',
	annodoc_root + 'lib/ext/webfont.js',
	// brat modules
	annodoc_root + 'lib/brat/dispatcher.js',
	annodoc_root + 'lib/brat/url_monitor.js',
	annodoc_root + 'lib/brat/visualizer.js',
	
	// embedding configuration
	annodoc_root + 'lib/local/config.js',
	
	// Annodoc
	annodoc_root + 'lib/local/annodoc.js',
	
    // NOTE: non-local libraries
	'https://spyysalo.github.io/conllu.js/conllu.js'
],   function(Jupyter, $, requirejs, textcell, utils) {
    "use strict";

    var load_ipython_extension = function() {

		function loadCss(url) {
			var link = document.createElement("link");
			link.type = "text/css";
			link.rel = "stylesheet";
			link.href = url;
			document.getElementsByTagName("head")[0].appendChild(link);
		}
		loadCss("/nbextensions/jupyter-annodoc/annodoc/css/style-vis.css")
	
		var visualizeConll = function(elem) {
			var element = $(elem)
			var parseFunction = Annodoc.parseFunctionMap[".conllx-parse"],
				cdataCopy = jQuery.extend(true, {}, Config.bratCollData);
            // hide to minimize "jumping" on draw
            // (https://github.com/spyysalo/annodoc/issues/11)
			element.hide();
			Annodoc.embedAnnotation(element, parseFunction, cdataCopy);  
		}

		var visualizeCurrentCell = function() {
			var cell = Jupyter.notebook.get_cell(Jupyter.notebook.index_or_selected())
			var output = cell.output_area.element.find("pre")[0]
			// check if the output is an escaped string representation
			if (output.textContent.startsWith("'") || output.textContent.startsWith("'")) {
				// parse the representation into a string to replace \t etc.
				output.textContent = JSON.parse('"' + output.textContent.slice(1,-1) + '"')
			}
			visualizeConll(output)
		}

        var action = {
            icon: 'fa-sitemap',
            help    : 'render output using annodoc',
            help_index : 'zz',
            handler : visualizeCurrentCell
        };
        var prefix = 'jupyter-annodoc';
        var action_name = 'visualize';

        var full_action_name = Jupyter.actions.register(action, action_name, prefix);
        Jupyter.toolbar.add_buttons_group([full_action_name]);
	};
	
	return {
		load_ipython_extension : load_ipython_extension
	};
});
