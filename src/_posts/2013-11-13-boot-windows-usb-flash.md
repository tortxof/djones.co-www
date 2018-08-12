---
layout: post
title: Making a Bootable Windows Install Flash Drive in Linux
---
Making a bootable flash drive for installing Windows is a bit more involved than you would think, but it's still easy.
Making a bootable linux flash drive is as simple as using dd to write the iso image directly to the flash drive.
Here are the steps involved to make it work with a Windows install.

## Partition the drive.

Create a single NTFS partition on the drive, and make it bootable.

    sudo fdisk /dev/sdc

Assuming `/dev/sdc` is your flash drive of course.

In fdisk, first do `o` to create a new empty partition table. Second, `n` to create a new partition.
Use the defaults for anything it asks. Then `t` to change the type. Change the type to `7` for NTFS.
Last step is `a` to make the partition bootable. Then `w` to write the changes to the drive.

## Format and copy data.

Now that the drive is partitioned, it's time to create an NTFS filesystem and copy the data over.

    sudo mkntfs -f -L Win7 /dev/sdc1

The `-f` option is for fast format. Otherwise it writes zeroes to the whole drive. We don't want to wait for that.
The `-L` option allows you to specify a volume label. Make it whatever you want. Enclose in quotes if you want spaces in your label.
Personally I avoid spaces whenever possible.
Finally `/dev/sdc1` is the partition we created with fdisk.

Next you will need to copy the contents of the install disc to your flash drive.
I usually mount the iso as loopback, but of course a physical disc will work just as well.

Create directory to mount to if using loop.

    mkdir loop

Mount the iso.

    sudo mount -o loop windows7.iso loop

I usually just unplug and replug the flash drive so it will automatically mount.
Then copy the contents over.

    rsync -av loop/ /media/win7/

Where `loop/` is where the iso or disc is mounted. The trailing slash is important.
And `/media/win7/` is where the flash drive is mounted.

After it's done copying, you can unmount the flash drive and iso or disc.

    sudo umount loop
    sudo umount /media/win7

## Write a bootloader.

The last step is to use ms-sys to write a bootloader to the flash drive.
You can download the source code from their website.

<http://ms-sys.sourceforge.net/>

Download and compile it. You shouldn't need to install any dependencies.

Finally, the command to write the bootloader.

    sudo ms-sys-2.2.1/bin/ms-sys -7 /dev/sdc

Note that here I'm running the ms-sys binary directly from the tree the source was extracted to, without installing it on the system.
If you install it, replace `ms-sys-2.2.1/bin/ms-sys` with `ms-sys`.

The `-7` option is for a Windows 7 bootloader. You can use `-m` instead for an XP bootloader.

That's it. You should be able to boot from the flash drive and install Windows much faster than from an optical disc.
