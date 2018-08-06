+++
draft = false
Title = "Como criar um pacote para <b>archlinux</b>"
subtitle = ""
description = "Criando pacotes para gerenciador pacman"
tags = ["archlinux", "pacman", "recipe"]
parent = "blog"
date = "2017-07-15"

#[[resources]]
#  name = "featured"
#  src = "images/containers-unsplash.jpg"
#  [resources.params]
#    colorscheme = "dark"

+++

Archlinux é uma das melhores distribuições Linux em 2018. Entretanto, a quantidade de software no catálogo ainda é inferior ao ubuntu,
e eventualmente você vai ter que instalar software manualmente.

Nesses casos, é muito útil saber como empacotar software. Dessa forma,
ainda podemos gerênciar instalação/atualizações/remoção usando o **pacman**, sem termos
software zumbi no sistema operacional.

Nesse artigo, vou mostrar como empacotar o software [giflossy](https://github.com/kornelski/giflossy), um otimizador lossy de gifs.

<!--more-->

### Instalando o `giflossy` manualmente

O primeiro passo, é compilar e instalar o software manualmente. Vamos baixar o Giflossy diretamente do `git` e instalar.

```
$ git clone https://github.com/pornel/giflossy
$ cd giflossy
$ autoreconf -i
$ ./configure
$ make
$ make install
```

O software compilou e instalou sem problemas. Vamos prosseguir e empacotar.

### Criando o pacote

Para criar o pacote, criamos um arquivo de receita chamado **PKGBUILD** . Cada gerenciador
de pacotes tem seu proprio formato de receita, alguns bastante burocráticos. Felizmente, 
o pacman usa simples _bash_ scripts, concisos e direto ao ponto.
 
Após a receita descrita, preparamos o pacote usando o programa `makepkg`, gerando um pacote no formato _tar.xz_.
Este pacote pode ser distribuido,e se instala diretamente através do pacman: `pacman -U <pacote>`

```
mkdir -o ~/Desktop/giflossy-pkg
cd ~/Desktop/giflossy-pkg
cp /usr/share/pacman/PKGBUILD.proto PKGBUILD
```

Vamos preencher a receita com as informações do software, como descrição, nome, licensa e versão.

```bash
# Maintainer: vical <barrabin.fc@gmail.com>
pkgname=giflossy
pkgver=1.89
pkgrel=1
epoch=
pkgdesc="Lossy GIF compressor ( fork of gifsicle)"
arch=('x86_64')
url="https://github.com/pornel/giflossy"
license=('GPL')
groups=()
depends=()
makedepends=()
checkdepends=()
optdepends=()
provides=()
conflicts=()
replaces=()
backup=()
options=()
install=
changelog=
source=("https://github.com/pornel/giflossy/archive/master.zip")
noextract=()
md5sums=("f37da4b0730a38778fa5901a80aa9636")
validpgpkeys=()

prepare() {
	cd "$pkgname-master"
	autoreconf -i
}

build() {
	cd "$pkgname-master"
	./configure --prefix=/usr
	make
}

check() {
	cd "$pkgname-master"
	make -k check
}

package() {
	cd "$pkgname-master"
	make DESTDIR="$pkgdir/" install
}
```

As funções essenciais ao processo são `prepare()`, `build()` e `package()`. Elas devem estar presentes, mesmo se vazias. Rode o processo de compilação na funcão `build`.

> **Atenção** 
>
> Por razões de integridade e segurança, é sempre necessário colocar o md5sum do pacote
> 
>```bash
$ md5sum master.zip
f37da4b0730a38778fa5901a80aa9636  master.zip
$
```  
>

Com a receita pronta, vamos rodar o programa `makepkg`, que irá gerar o pacote **giflossy-1.89-1-x86_64.pkg.tar**.

Podemos preparar o pacote quantas vezes for necessário, ajustando e adaptando a receita até estar perfeita.
 
### Validando o pacote

Embora o pacote esteja pronto, pode ainda conter alguns erros. Um deles, no nosso caso, é que esquecemos de 
declarar uma dependencia. A ferramenta `namcap` ajuda nesse processo de encontrar erros:

```bash
$ namcap PKGBUILD
$ namcap <pacote>.tar.xz
giflossy E: Dependency libx11 detected and not included (libraries ['usr/lib/libX11.so.6'] needed in files ['usr/bin/gifview'])
```

Ótimo! Podemos voltar ao nosso PKGBUILD e corrigir , declarando as dependencias que faltam e criando de novo o pacote

```
depends=("libx11")
```

### Instalando 

1. 
	Para instalar o pacote: `pacman -U <pacote>.tar.xz`
2. 
	Apagar: `pacman -R giflossy`


***

>
> **Pacotes baixados através do git**
>
> Como nosso pacote é baixado através do git, a versão do pacote
> pode não ser a versão que é baixada do git. 
> Nesses casos, fazemos [autobump de versão](https://wiki.archlinux.org/index.php/VCS_package_guidelines#The_pkgver.28.29_function)
> 
> Para isso, sobrescrevemos a função `pkgver()`, que deve retornar uma string com a versão do software.
> No nosso caso, vamos ler a versão do arquivo **NEWS**
> 
> 
> ```bash
>pkgver() {
>	cd "$pkgname-master"
>	head NEWS | grep Version | awk '{print $2}'
>}
> ```
>
> Pronto! Agora o pacote é sempre atualizado do git.
