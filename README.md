Qr Code Authentication
======================

Authenticate already logged-in users by scanning qrcode.

Downloading with `drush make`
---------------------------

```
; boostrap.make
projects[qrauth][subdir] = "contrib"
projects[qrauth][download][url] = "git@git.zebralog.net:simon.schroeter/drupal-qrauth.git"
projects[qrauth][download][type] = "git"
projects[qrauth][download][branch] = "7.x-1.0"
```
```
$ drush make bootstrap.make
```

Downloading with `git`
---------------------
```
git submodule add git@git.zebralog.net:simon.schroeter/drupal-qrauth.git sites/all/modules/contrib/qrauth
mkdir -p sites/all/libraries/qrauth
wget -qO- http://release.larsjung.de/jquery-qrcode/jquery-qrcode-0.11.0.zip | bsdtar -C sites/all/libraries/qrauth -xvf-
```

Installation
-----------
```
drush pm-enable qrauth
```