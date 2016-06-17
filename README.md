# Untangled
To build 'hugo' will need to be available in $PATH

Create local folder for exeutables and update the $PATH variable

`mkdir -p ${HOME}/bin`

`echo 'export PATH=$PATH:${HOME}/bin' >> ${HOME}/.bashrc`

`source ${HOME}/.bashrc`

Download and extract hugo release (substitute arch/release where needed)

`cd ${HOME}`

`wget https://github.com/spf13/hugo/releases/download/v0.16/hugo_0.16_linux-64bit.tgz -O - | tar -zxvf -`

`mv ./hugo ${HOME}/bin`

Test hugo binary can be sourced

`which hugo`

---

`anthony@spaghetti:~$ which hugo`

`/home/anthony/bin/hugo`

---

To deploy, commit local changes (ensure all other changes have been pushed on master and gh-pages branches)

Run deploy

`npm run deploy`
