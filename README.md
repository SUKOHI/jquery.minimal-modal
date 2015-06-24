jquery.minimal-modal
=========================

A jQuery package to manage modal very simply.
(Tested on IE 11, Firefox, Google Chrome)

Requirements
====

jQuery

Installation
=====
Using bower is the simplest way.

    bower install jquery.minimal-modal --save-dev

Usage
====

**Simple Way 1**

    (in HTML)
    
    <a href="#" id="click-button">click-button</a>
    <div id="other-content" style="display:none;">
        You can display this.
        <br><br>
        <div style="text-align: right">
            <a href="#" class="minimal-modal-close">Close</a>
        </div>
    </div>
    

    (in JavaScript)

    $.minimalModal({
        selector: '#click-button',      // Click button selector to open the modal.
        content: '#other-content'       // You need to prepare content in HTML.
    });
    

**Simple Way 2**

    (in HTML)
    
    <a href="#" id="click-button">click-button</a>
    
    
    (in JavaScript)

    $.minimalModal({
        selector: '#click-button',
        content: function(e){

            return 'Content you want.<button class="minimal-modal-close">close</button>';

        }
    });
    
    
**with Options**

    $.minimalModal({
        selector: '#click-button',
        fadeIn: 'slow',             // Optional(Default: slow)
        fadeOut: 'slow',            // Optional(Default: slow)
        width: '80%',               // Optional(Default: 50%) *px is also available.
        maxHeight: '150px',         // Optional
        background: true,           // Optional(Default: true)  Display background or not?
        modalClickClose: true,      // Optional(Default: true)  Close when clicking modal?
        content: function(e){

            return 'Content <button class="minimal-modal-close">close</button>';

        }, 
        callback: function(e){      // Optional

            console.log('callback');

        }
    });
    
**Using Ajax**

    $.minimalModal({
        selector: '#click-button',
        content: function(e){

            return 'Loading..';

        },
        callback: function(e, minimalModal){

            var url = 'http://example.com';
            var data = {};
            
            $.get(url, {}, function(text){

                minimalModal.setContent(text);
                minimalModal.centerContent();

            });

        }
    });

License
====

This package is licensed under the MIT License.

Copyright 2015 Sukohi Kuhoh