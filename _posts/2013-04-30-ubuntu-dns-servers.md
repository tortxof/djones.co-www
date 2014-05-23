---
layout: post
title: Changing DNS Servers in Ubuntu 12.04 and Later
---
The Problem
-----------

You want to change your DNS servers, but you can't simply edit /etc/resolv.conf anymore.

The Solution
------------

First, if you're runnung Ubuntu Desktop or one of the derivatives, you need to disable dnsmasq.
Edit the file /etc/NetworkManager/NetworkManager.conf and comment out the line "dns=dnsmasq".

Then edit /etc/dhcp/dhclient.conf and find the line that starts with "prepend domain-name-servers".
It's probably commented out; Fix that.
Assuming you want to always use Google DNS servers, make it look like this:

`prepend domain-name-servers 8.8.8.8, 8.8.4.4;`

Reboot, and you problem should be solved.
