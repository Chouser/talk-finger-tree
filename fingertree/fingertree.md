!SLIDE bullets small transition=scrollLeft

# Finger Trees

* If you want to try them out during the talk...

.notes foo

    @@@sh
    git clone git://github.com/clojure/data.finger-tree.git fingertree
    cd fingertree
    mvn clojure:repl

.notes foo

    @@@clojure

    (use 'clojure.data.finger-tree)
    (apply double-list '[a b c d e f g h i j k l m n o p q])

!SLIDE bullets

# Finger Trees
* Custom Persistent Collections

* <br/>Chris Houser
* a.k.a. Chouser
* Clojure Conj, Oct. 22 2010, Durham NC

!SLIDE bullets incremental transition=scrollLeft

# 2-3 finger trees

* Invented by Ralf Hinze and Ross Paterson
* Persistent collction type
* Complements existing Clojure collections
* `Sequential`, `Seqable`
* Supports conj/peek/pop on the right
* Supports cons/first/rest on the left

!SLIDE center transition=scrollLeft

# double-list

<embed src="image/fingertree/media/ft1.svg" width="1024" height="768" type="image/svg+xml" />

!SLIDE center transition=fade

# counted-double-list

<embed src="image/fingertree/media/ft-counted.svg" width="1024" height="768" type="image/svg+xml" />

!SLIDE center transition=fade

# Lookup by count

<embed src="image/fingertree/media/ft-counted-lookup.svg" width="1024" height="768" type="image/svg+xml" />

!SLIDE center transition=scrollLeft

# Split

    @@@clojure
    (ft-split-at cdl 5)

<embed src="image/fingertree/media/ft-split.svg" width="1024" height="768" type="image/svg+xml" />

!SLIDE center transition=scrollLeft

# Split

    @@@clojure
    (ft-split-at cdl 5)

<embed src="image/fingertree/media/ft-split-rev.svg" width="1024" height="768" type="image/svg+xml" />
