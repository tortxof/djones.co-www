---
layout: post
title: User Mode MPD in Ubuntu Studio
---
In Ubuntu Studio, MPD runs as a system service by default.
Documentation on setting it up to run on login is kind of sparse.
PulseAudio runs with user permissions, so MPD needs to run this way too so they can play nice together.

First, go ahead and install MPD if it is not already.

    sudo apt-get install mpd

And also a client. I like ncmpc (runs in terminal).

    sudo apt-get install ncmpc

Next step is to disable the MPD system service.

    sudo update-rc.d mpd disable

Now it's time to create a config directory for MPD. I put mine at `~/mpd`, but `~/.mpd` is fine if you want it hidden.

    mkdir ~/mpd

I keep my music at `~/music`, and created a symlink to it from our new MPD directory.

    cd ~/mpd
    ln -s ../music

Next, we need to create some empty files and a playlist directory for MPD.

    cd ~/mpd
    mkdir playlists
    touch {mpd.log,pid,state,tag_cache,sticker.sql}

Now we will copy the default system config for mpd and modify it.

    cp /etc/mpd.conf ~/.mpdconf

Now, edit `~/.mpdconf` with your text editor.

In the "Files and Directories" section, edit these lines:

    music_directory    "~/mpd/music"
    playlist_directory "~/mpd/playlists"
    db_file            "~/mpd/tag_cache"
    log_file           "~/mpd/mpd.log"
    pid_file           "~/mpd/pid"
    state_file         "~/mpd/state"
    sticker_file       "~/mpd/sticker.sql"

And in the next section, "General music daemon options", change the "user" line to your own username.

    user "tortxof"

Lastly, in the "Audio Output" section, disable alsa and enable pulse.

    #audio_output {
    #type          "alsa"
    #name          "My ALSA Device"
    #device        "hw:0,0"   # optional
    #mixer_type    "hardware" # optional
    #mixer_device  "default"  # optional
    #mixer_control "PCM"      # optional
    #mixer_index   "0"        # optional
    #}

Don't forget to comment out that closing brace!

    audio_output {
    type    "pulse"
    name    "My Pulse Output"
    #server "remote_server"      # optional
    #sink   "remote_server_sink" # optional
    }

You don't need the "server" and "sink" lines.

Now you should be ready to start up MPD.
You can just run `mpd` from the terminal, and it should start up.
It may complain about a corrupted database, just because it's an empty file.
It shouldn't complain on subsequent start-ups.
Then fire up `ncmpc`, and it should be in the process of building a database.

The last thing to do is tell our desktop environment to start MPD when we log in.
If you're using the default XFCE for Ubuntu Studio, go to the Applications Menu,
Settings Manager, System subheading, and open "Session and Startup".
In the "Application Autostart" tab, MPD should be listed.
Make sure it's checked, and reboot to be sure it starts up.

After rebooting and logging in, run your client and you should be good to go.
