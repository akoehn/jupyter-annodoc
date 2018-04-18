Tired of reading dependency structures as text in your jupyter
notebook?  This jupyter notebook extension visualizes NLP output using
brat[^1], encapsuled by annodoc[^2].

Installation:
 * clone this repository
 * run `jupyter-nbextension install jupyter-annodoc`, add `--user` or `--symlink` if you like
 * run `jupyter-nbextension enable jupyter-annodoc`
 
Open a jupyter notebook with a conll-x string as output, select that
cell and click on the new jupyter-annodoc icon to convert the output.

This plugin tries to be smart about the output you provide.  If the
output is enclosed in quotes it assumes jupyter shows a variables's
content and will unescape the output.  Otherwise it will use the
output as-is.

Currently, conll-x format is hardcoded.  Patches welcome for automatic
or manual selection of the right backend!

If you use it, drop me a short mail for motivation :-)

[^1]: http://brat.nlplab.org/
[^2]: http://spyysalo.github.io/annodoc/
