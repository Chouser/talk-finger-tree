!SLIDE center bullets

# Finger Trees
* Custom Persistent Collections

* <br/>Chris Houser<br/>a.k.a. Chouser
* Clojure Conj, Oct. 22 2010, Durham NC

<h3>
<br/>
Hack around with them during the talk:<br/>
<code style="font-size: 100%">http://tinyurl.com/fingertree</code>
</h3>

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

.notes rest/pop similar, not like on vector
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

.notes like sorted-map-by

    @@@clojure
    (finger-tree (meter
                   (constantly 1)  ; measure
                   0               ; measure of empty
                   +))             ; combine

* “measure of empty” and “combine” together form a *monoid*
* Split uses a predicate, splits where the predicate changes from false to true

.notes .

    @@@clojure
    (split-tree tree #(> % 5))

!SLIDE bullets transition=scrollLeft

# Meter for `_________`

    @@@clojure
    (finger-tree (meter
                   identity        ; measure
                   nil             ; measure of empty
                   #(or %2 %1)))   ; combine

<embed src="image/fingertree/media/ft-sorted.svg" width="1024" height="768" type="image/svg+xml" />

!SLIDE bullets transition=scrollLeft

# counted-sorted-set

<embed src="image/fingertree/media/ft-counted-sorted.svg" width="1024" height="768" type="image/svg+xml" />

!SLIDE bullets transition=scrollLeft

# counted-sorted-set

    @@@clojure
    (def css (apply counted-sorted-set
                    '[m j i e d a f k b c f g h l]))
    css
    ;=> (a b c d e f g h i j k l m)

    (get css 'e)      ; O(log(n))
    ;=> e

    (get css 'ee)     ; O(log(n))
    ;=> nil

    (count css)       ; O(1)
    ;=> 13

    (nth css 5)       ; O(log(n))
    ;=> f

!SLIDE bullets transition=scrollLeft

# Build-your-own finger tree

    @@@clojure
    (def empty-cost-tree (finger-tree (meter :cost 0 +)))

    (def ct (conj empty-cost-tree
                  {:id :h, :cost 5} {:id :i, :cost 1}
                  {:id :j, :cost 2} {:id :k, :cost 3}
                  {:id :k, :cost 4}))

    (measured ct)
    ;=> 15

    (next (split-tree ct #(> % 7)))
    ;=> ({:cost 2, :id :j}
         ({:cost 3, :id :k} {:cost 4, :id :k}))

    (next (split-tree (rest ct) #(> % 7)))
    ;=> ({:cost 4, :id :k} ())

!SLIDE bullets transition=scrollLeft

# Summary of `clojure.data.finger-tree`

* double-list (add/remove on left/right)
* counted-double-list (double-list plus nth)
* counted-sorted-set (like sorted-set plus nth)
* tools for building your own finger-tree

!SLIDE bullets transition=scrollLeft

# Future work

* Implement metadata, equality, etc.
* Adjust Clojure's abstractions to allow<br />`cons conj split-at concat` instead of<br />`consl conjr ft-split-at ft-concat`
* Tests for correctness, complexity
* Performance
* Primitives

!SLIDE bullets center transition=scrollLeft

# Questions?

<embed src="image/fingertree/media/cover.svg" width="1024" height="268" type="image/svg+xml" />

* <br/><br/>`http://tinyurl.com/fingertree`

