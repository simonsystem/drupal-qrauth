Qr Code Authentication
======================

Authenticate already logged-in users by scanning qrcode.

Downloading with `drush make`
---------------------------

```
; boostrap.make
projects[qrauth][subdir] = "contrib"
projects[qrauth][download][url] = "https://github.com/simonsystem/drupal-qrauth/archive/7.x-1.0.zip"
projects[qrauth][download][type] = "get"
```
```
$ drush make bootstrap.make
```

Downloading with `git`
---------------------
```
git submodule add git@github.com:simonsystem/drupal-qrauth.git sites/all/modules/contrib/qrauth
mkdir -p sites/all/libraries/qrauth
wget -qO- http://release.larsjung.de/jquery-qrcode/jquery-qrcode-0.11.0.zip | bsdtar -C sites/all/libraries/qrauth -xvf-
```

Installation
-----------
```
drush pm-enable qrauth
```
