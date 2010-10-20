!SLIDE bullets small transition=scrollLeft

# Finger Trees

* If you want to try them out during the talk...

.notes .

    @@@sh
    git clone git://github.com/clojure/data.finger-tree.git fingertree
    cd fingertree
    mvn clojure:repl

.notes .

    @@@clojure

    (use 'clojure.data.finger-tree)
    (apply double-list '[a b c d e f g h i j k l m n o p q])

!SLIDE center bullets

# Finger Trees
* Custom Persistent Collections

* <br/>Chris Houser
* a.k.a. Chouser
* Clojure Conj, Oct. 22 2010, Durham NC

!SLIDE bullets incremental transition=scrollLeft

# Finger Trees

* Invented by Ralf Hinze and Ross Paterson
* Another persistent collection type
* Complements existing Clojure collections
* Customizable

!SLIDE bullets transition=scrollLeft

# double-list

    @@@clojure
    (def dl (double-list 4 5 6 7))

    dl
    ;=> (4 5 6 7)

    [(first dl) (rest dl)]
    ;=> [4 (5 6 7)]

    [(pop dl) (peek dl)]
    ;=> [(4 5 6) 7]

.notes conj is insufficient, cons is incorrect, for now must...

!SLIDE bullets transition=scrollLeft

# new “conj” functions

* conjr *always* adds on the right

.notes .

    @@@clojure
    (conjr dl 'x)
    ;=> (4 5 6 7 x)

* consl adds on the left and keeps the collection type

.notes .

    @@@clojure
    (consl dl 'x)
    ;=> (x 4 5 6 7)

* So far these are all amortized constant time

!SLIDE center transition=scrollLeft

<embed src="image/fingertree/media/hands.svg" width="1024" height="768" type="image/svg+xml" />

!SLIDE center transition=scrollLeft

# double-list

.notes depth increases
.notes first/peek easy
.notes conjr/consl, push down, delay
.notes rest/pop similar, not like on vector
.notes but vector/pl are counted.  how could we?

    @@@clojure
    (apply double-list '[a b c d e f g h i j k l m])

<embed src="image/fingertree/media/ft-double-list.svg" width="1024" height="768" type="image/svg+xml" />

!SLIDE transition=fade

# counted-double-list

.notes .

    @@@clojure
    (apply counted-double-list '[a b c d e f g h i j k l m]))

<embed src="image/fingertree/media/ft-counted.svg" width="1024" height="768" type="image/svg+xml" />

!SLIDE center transition=fade

# Lookup by count

.notes .

    @@@clojure
    (nth cdl 5)

<embed src="image/fingertree/media/ft-counted-lookup.svg" width="1024" height="768" type="image/svg+xml" />

!SLIDE center transition=scrollLeft

# Split

    @@@clojure
    (ft-split-at cdl 5)
    ;=> [(a b c d e) f (g h i j k l m)]

<embed src="image/fingertree/media/ft-split.svg" width="1024" height="768" type="image/svg+xml" />

!SLIDE transition=scrollLeft

# Assoc

    @@@clojure
    (def parts
      (let [[left _ right] (ft-split-at cdl 5)]
        {:left left, :right right}))

    parts
    ;=> {:left (a b c d e), :right (g h i j k l m)}

    (ft-concat (conjr (:left parts) 'XX) (:right parts))
    ;=> (a b c d e XX g h i j k l m)

!SLIDE transition=scrollLeft

# Remove and Insert

    @@@clojure
    (ft-concat (:left parts) (:right parts))
    ;=> (a b c d e g h i j k l m)
                  ^-- missing f

    (ft-concat (into (:left parts) '[X Y Z]) (:right parts))
    ;=> (a b c d e X Y Z g h i j k l m)

.notes nth still works

!SLIDE bullets transition=scrollLeft

# Meter for counted-double-list

    @@@clojure
    (EmptyTree. (meter
                  (constantly 1)  ; measure
                  0               ; zero
                  +))             ; combine

* “zero” and “combine” together form a *monoid*
* Split uses a predicate, splits where the predicate changes from false to true

.notes .

    @@@clojure
    (split-tree tree #(< 5 %))

!SLIDE bullets transition=scrollLeft

# Meter for `_________`

    @@@clojure
    (EmptyTree. (meter
                  identity        ; measure
                  nil             ; “zero”
                  #(or %2 %1)))   ; combine

<embed src="image/fingertree/media/ft-sorted.svg" width="1024" height="768" type="image/svg+xml" />

!SLIDE bullets transition=scrollLeft

# counted-sorted-set

<embed src="image/fingertree/media/ft-counted-sorted.svg" width="1024" height="768" type="image/svg+xml" />

    @@@clojure
    (EmptyTree. (meter
                  identity        ; measure
                  nil             ; “zero”
                  #(or %2 %1)))   ; combine

!SLIDE bullets transition=scrollLeft

# Future work

* Implement metadata, equality, etc.
* Adjust Clojure's abstractions to allow<br />`cons conj split-at concat` instead of<br />`consl conjr ft-split-at ft-concat`
* Tests for correctness, complexity
* Performance
* Primitives
