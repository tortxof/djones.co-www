---
layout: post
title: CSS For Small Screens
---
This is a quick way to make your website work better on small screens.

CSS media queries allow you to have different layouts for different media. In this case, we will define a section of our style sheet to only apply below a certain resolution.

    @media only screen and (max-width: 512px), only screen and (max-device-width: 512px) {
    /* CSS code goes here */
    }

Basically, if the browser width is 512 pixels or less, The code in brackets will apply. This should be at the end of your CSS file.

You should also add the following meta tag in the head of your html.

    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

This basically prevents mobile browsers from having virtual viewports larger than the physical screen.

Lastly, you can test your layout at different resolutions easily in Firefox using "Responsive Design View". It's located in the "Tools" > "Web Developer" menu. Keyboard shortcut is (Ctrl+Shift+M).

For more details, take a look at these articles:

- [Smashing Magazine](http://mobile.smashingmagazine.com/2010/07/19/how-to-use-css3-media-queries-to-create-a-mobile-version-of-your-website/)
- [w3schools.com](http://www.w3schools.com/css/css_mediatypes.asp)
- [Mozilla Developer Network](https://developer.mozilla.org/en-US/docs/CSS/Media_queries)
