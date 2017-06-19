+++
draft = false
description = "Criando pacotes para gerenciador pacman"
Title = "Como criar um pacote para archlinux"
parent = "blog"

colorscheme = "light"
color = "#0f0f0f"
bg_color = "rgba(255,255,255, 0.90)"
high_color = "#f05553"
txt_color = "#4b4748"
+++

Como criar um pacote archlinux
==============================

Como muitas pessoas, eu adoro archlinux e seu gerenciador de pacotes. 
Porém , a quantidade de software no catálogo ainda é inferior ao ubuntu ou Mac,
e eventualmente você vai ter que instalar software manualmente.

Nesses casos, é muito útil saber como empacotar software para archlinux. Dessa forma,
ainda podemos gerênciar instalação/atualizações/remoção usando o `pacman`, sem termos
software zumbi no sistema operacional.

Nesse artigo, vou mostrar como empacotar o software `Giflossy`, um otimizador lossy de gifs.

Instalando o `giflossy` manualmente
===================================

O primeiro passo, é compilar e instalar o software manualmente. Em sistemas unix, quase todos os softwares
vem com um ciclo de 3 passos:

```
$ ./configure
$ make
$ make install
```

Estes passos garantem que o software compile e funciona corretamente na sua máquina.
Antes de criar o pacote, é sempre necessário testar localmente.

No nosso caso, vamos baixar o Giflossy diretamente do `git` e instalar.
Como o software foi baixado através do git, não existe o arquivo 'configure'. 
Nestes casos, basta rodar o `autoconf` com o comando `autoreconf -i` e prosseguir.

```
$ git clone https://github.com/pornel/giflossy
$ cd giflossy
$ autoreconf -i
$ ./configure
$ make
$ make install
```

O software compilou e instalou sem problemas. Podemos prosseguir e criar o pacote!

Criando o pacote
=================

Para criar o pacote, criamos um arquivo de receita chamado `PKGBUILD` . Cada gerenciador
de pacotes tem seu proprio formato de receita, alguns bastante burocráticos. Felizmente, 
o do `pacman` é simples, conciso e direto ao ponto.
 
Após a receita descrita, preparamos o pacote usando o programa `makepkg`, gerando um `zip` no formato `tar.xz`.
Este zip é o pacote final que é distribuido e instalado diretamente através do pacman: `pacman -U <pacote>`

Para criar o nosso pacote, vamos criar uma nova pasta e copiar o esqueleto padrão do PKGBUILD

```
mkdir -o ~/Desktop/giflossy-pkg
cd ~/Desktop/giflossy-pkg
cp /usr/share/pacman/PKGBUILD.proto PKGBUILD
```

Agora precisamos preencher a receita com as informações do software. 
Os campos devem ser as descrições do software, como nome, licensa e versão.

No nosso caso, nosso arquivo ficou assim
```
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

Tome atenção com os campos `source` e `md5sum`. Assim como as funções `prepare()`, `build()` e `package()`, 
elas são a `crux` e o segredo do processo.

```
Atenção: Por razões de integridade e segurança, é sempre necessário colocar o md5sum do pacote
```

```
$ md5sum master.zip
f37da4b0730a38778fa5901a80aa9636  master.zip
$
```  

Agora vamos preparar o prato!

```
$ makepkg
```

Podemos preparar a receita quantas vezes for necessário, até ela dar certo. Vamos adaptando o PKGBUILD e repetindo o processo. 
No final, teremos nosso pacote `giflossy-1.89-1-x86_64.pkg.tar`

Validando o pacote
==================

Embora o pacote esteja pronto, pode ainda conter alguns erros. Um deles, no nosso caso, é que esquecemos de 
declarar uma dependencia. A ferramenta `namcap` ajuda nesse processo de encontrar erros:

```
$ namcap PKGBUILD
$ namcap <pacote>.tar.xz
giflossy E: Dependency libx11 detected and not included (libraries ['usr/lib/libX11.so.6'] needed in files ['usr/bin/gifview'])
```

Ótimo! Podemos voltar ao nosso PKGBUILD e corrigir , declarando as dependencias:

```
depends=("libx11")
```

Repetindo o processo do `namcap`, nosso pacote está 100% correto!

Instalando 
==========

Para instalar o pacote:

```pacman -U <pacote>.tar.xz```

e para apagar:

```pacman -R giflossy```


Notas p/ pacotes baixados através do git
==========================================

Como nosso pacote é baixado através do git, a versão descrita do pacote
pode não ser a versão que é baixada do git. O archlinux recomenda que nesses
casos fazemos um autobump de versão (https://wiki.archlinux.org/index.php/VCS_package_guidelines#The_pkgver.28.29_function)

Para isso, sobrescrevemos a função `pkgver()`, que deve retornar a versão do software.
No nosso caso, vamos ler a versão do arquivo NEWS

```pkgver() {
	cd "$pkgname-master`
	head NEWS | grep Version | awk '{print $2}'
}```

Pronto! Agora não precisamos atualizar a mão toda vez que ocorrer uma atualização do `giflossy`.
