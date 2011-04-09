/**
* pdf-ui.js - A basic dom walker to generate pdf files using pdf.js 
*/
(function($, global) {

    var allowedTag = 'h1 h2 h3 h4 h5 h6 a p blockquote ul li code'.split(' '),

    config = {
        marginL: 15,
        baseLine: 10,
        pageLineNb: 28,
    },

    walkTheDOM = function walker(texas, ranger) {
        ranger(texas);
        texas = texas.firstChild;
        while (texas) {
            walkTheDOM(texas, ranger);
            texas = texas.nextSibling;
        }
    },
    
    link = $('p.download').find('a'),
    
    base = $('textarea'),

    createDoc = function(ev) {
        var doc = new pdf(),
        _text = doc.text,

        line = (function() {
            var l = 2;

            return {
                line: function() {
                    return l;
                },

                increment: function(val) {
                    l = l + (val || 1);

                    if (l % config.pageLineNb === 0) {
                        doc.addPage();
                        l = 2;
                    }

                    return l;
                }
            };
        })(),
                
        t = $(ev.target),

        // prior to pdf and dom walker, build html and dom to render using showdown
        dummy = $('<div />').html(new Showdown.converter().makeHtml(base.val()))[0];

        doc.setProperties({
            title: 'A test at the DOM with pdf.js',
            subject: 'PDFs are kinda cool, i guess',
            author: 'Your Name here',
            keywords: 'pdf.js, javascript, dom',
            creator: 'pdf.js',
            fonts: {
                Helvetica: 'F0',
                Georgia: 'F1',
                'Times-Roman': 'F2',
                Courier: 'F3'
            }
        });
        
        doc.text = function(marginLeft, text, font, doNotEscape) {
            var m = [];

            font = font || 'Helvetica';

            text = doNotEscape ? $.trim(text) : $.trim(text).replace(/\n/g, ' ');

            if (text.length > 70) {
                m = text.match(/.{0,70}[\s|\.|:]/gim);
                $.each(m, function(i, val) {
                    _text.call(this, marginLeft, config.baseLine * line.line(), val, font);
                    line.increment();
                });
            } else if (/\n/.test(text)) {
                m = text.split(/\n/gim);
                $.each(m, function(i, val) {
                    _text.call(this, marginLeft, config.baseLine * line.line(), val, font);
                    line.increment();
                });
            } else {
                _text.call(this, marginLeft, config.baseLine * line.line(), text, font);
            }

            line.increment();
        };

        walkTheDOM(dummy || document.body,  function(node) {
            var t = node.nodeName.toLowerCase(),
            lineLn = 0,
            text = "",
            m,
            marginL = 15;

            if ((node.nodeType !== 1) || $.inArray(t, allowedTag) === -1) {
                return;
            }

            marginL = t === 'ul' || t === 'li' ? config.marginL + 10:
                t === 'p' ? config.marginL + 5:
                t === 'blockquote' ? config.marginL + 25:
                t === 'code' ? config.marginL + 10:
                config.marginL;


            text = $(node).text();
            if (t === 'h1') {
                line.increment();
                doc.setFontSize(22);
                doc.text(marginL, text);
            } else if (t === 'h2') {
                doc.setFontSize(20);
                line.increment();
                doc.text(marginL, text);
            } else if (t === 'h3') {
                line.increment();
                doc.setFontSize(18);
                doc.text(marginL, text);
            } else if (t === 'h4') {
                line.increment();
                doc.setFontSize(16);
                doc.text(marginL, text);
            } else if (t === 'h5') {
                line.increment();
                doc.setFontSize(14);
                doc.text(marginL, text);
            } else if (t === 'h6') {
                doc.setFontSize(14);
                doc.text(marginL, text);
            } else if (t === 'p' && node.parentNode.nodeName.toLowerCase() === 'div') {
                doc.setFontSize(14);
                doc.text(marginL, text);
            } else if (t === 'ul') {
                doc.setFontSize(14);
            } else if (t === 'li') {
                doc.setFontSize(14);
                doc.text(marginL, '* ' + text);
            } else if (t === 'blockquote') {
                doc.setFontSize(14);
                doc.text(marginL, text, 'Times-Roman');
            } else if (t === 'code' && /\n/.test(text)) {
                doc.setFontSize(12);
                doc.text(marginL, text, 'Courier', true);
            }
            
        });

        filename = "testFile" + new Date().getSeconds() + ".pdf";
        pdfAsDataURI = doc.output('datauri', {
            fileName: filename
        });
        
        link.attr('href', pdfAsDataURI)
            .text(filename)
            .closest('p').show();
            
        return false;
    };

    $('a.generate').bind('click', createDoc);


})(this.jQuery, this);