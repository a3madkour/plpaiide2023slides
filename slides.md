---
# try also 'default' to start simple
theme: default
# random image from a curated Unsplash collection by Anthony
# like them? see https://unsplash.com/collections/94734566/slidev
# apply any windi css classes to the current slide
class: 'text-center'
# https://sli.dev/custom/highlighters.html
highlighter: shiki
# show line numbers in code blocks
lineNumbers: false
# some information about the slides, markdown enabled
info: |
  ## Slidev Starter Template
  Presentation slides for developers.

  Learn more at [Sli.dev](https://sli.dev)
# persist drawings in exports and build
drawings:
  persist: false
# page transition
transition: fade
# use UnoCSS
css: unocss
---

# Probabilistic Logic Programming Semantics for Procedural Content Generation 


Abdelrahman Madkour, Chris Martens, Steven Holtzen, Casper Harteveld, Stacy Marsella

<div class="flex justify-center">
 <img src="/imgs/posterqr.png" class="w-40 content-center" /> 
 </div>
<!--
The last comment block of each slide will be treated as slide notes. It will be visible and editable in Presenter Mode along with the slide. [Read more in the docs](https://sli.dev/guide/syntax.html#notes)
-->

---

# Poster Pitch

<div class="absolute top-0 right-0 h-35 w-30 ...">
<img src="/imgs/posterqr.png" class="content-center" /> 
</div>

<v-clicks >

<h2 class="large"> Probability is Bayes-ed </h2>

 <h2 class="large"> Probabilistic Logic Programming (PLP) is a useful framework for PCG </h2>

 <h2 class="large"> Analyzing the benefits and shortcomings of an existing PLP system -- Problog </h2>
 

</v-clicks>

<!-- --- -->
<!-- layout: cover -->
<!-- --- -->

<!-- # Motivation -->

<!-- <div class="absolute top-0 right-0 h-35 w-30 ..."> -->
<!-- <img src="imgs/posterqr.png" class="content-center" />  -->
<!-- </div> -->

---

<!-- # Opinion: Randomness is important to defining a generator  -->

<!-- <div class="absolute top-0 right-0 h-35 w-30 ..."> -->
<!-- <img src="imgs/posterqr.png" class="content-center" />  -->
<!-- </div> -->

<!-- <v-clicks class="medium"> -->

<!-- - The goal of this work is to define a generative space not a single artifact -->
<!-- - We then want to sample from that space -->
<!-- - If diversity is required then this involves a form of randomness -->
<!-- - Formally characterizing this randomness empowers us to manipulate the generator according to design goals -->

<!-- </v-clicks> -->
<!--
Presenter note with **bold**, *italic*, and ~~striked~~ text.

Also, HTML elements are valid:
<div class="flex w-full">
  <span style="flex-grow: 1;">Left content</span>
  <span>Right content</span>
</div>
-->


<!-- --- -->


# The need for an explicitly Bayesian formulation of PCG

<div class="absolute top-0 right-0 h-35 w-30 ...">
<img src="/imgs/posterqr.png" class="content-center" /> 
</div>

<v-clicks class="rand">

- Goal: Authorial tools for defining content generators
- We argue that randomness is important to defining a diverse content generator
- Approach: Leverage existing mathematical formulations of randomness to come up with tools that makes reasoning about randomness of generators clearer
- We can also make use of both authorship-focused frameworks (e.g. grammars and declarative logic semantics) and data-driven approaches
- Many many existing methods of modeling randomness are Bayesian
  - See *Probability Theory: The Logic of Science*  by E.T. Jaynes and G. Larry Bretthorst
  - A derivation of Bayes' rule based on desiderata on logic under uncertainty

</v-clicks>


<!-- --- -->

<!-- # Example: Grid-Based Level Generation -->

<!-- <div class="absolute top-0 right-0 h-35 w-30 ..."> -->
<!-- <img src="imgs/posterqr.png" class="content-center" />  -->
<!-- </div> -->

<!-- <div v-click> -->
<!-- <p style="color:green; font-size:30px; position: absolute; left:20px; top:105px">Start</p> -->

<!-- <arrow x1="70" y1="150" x2="160" y2="235" color="green" width="3" arrowSize="1" /> -->
<!-- </div> -->

<!-- <div v-click> -->
<!-- <arrow x1="450" y1="500" x2="355" y2="425" color="red" width="3" arrowSize="1" /> -->
<!-- <p style="color:red; font-size:30px; position: absolute; left:440px; top:490px">End</p> -->
<!-- </div> -->

<!-- <div v-click> -->
<!-- <arrow x1="450" y1="150" x2="355" y2="235" color="black" width="3" arrowSize="1" /> -->
<!-- <p style="color:black; font-size:30px; position: absolute; left:400px; top:105px">Un-traversable</p> -->
<!-- </div> -->


<!-- <div style="display:flex; align-items:center; justify-content:space-evenly; height:100%"> -->
<!-- <OneGrid grid_num="11" size="95" /> -->
<!-- <div v-click> -->
<!-- <p style="font-size:50px"> => </p> -->
<!-- </div> -->
<!-- <div v-click> -->
<!-- <OneGrid grid_num="11" size="95" value="true" /> -->
<!-- </div> -->
<!-- </div> -->


<!-- --- -->

<!-- # Example: 2x2 Grid -->

<!-- <div class="absolute top-0 right-0 h-35 w-30 ..."> -->
<!-- <img src="imgs/posterqr.png" class="content-center" />  -->
<!-- </div> -->

<!-- - Let's call the "universe" of all possible grids $\Omega$ -->

<!-- <HelloWorld /> -->

---

<!-- # Constraints -->

<!-- <div class="absolute top-0 right-0 h-35 w-30 ..."> -->
<!-- <img src="imgs/posterqr.png" class="content-center" />  -->
<!-- </div> -->

<!-- <v-clicks> -->

<!-- - One way to specify what we want out of $\Omega$ is through constraints -->
<!--   - By which we eliminate undesirable artifacts  -->
<!--   - Weigh artifacts differently depending on design criteria -->

<!-- - In this work we categorize constraints into two categories: -->
<!--   - Validity Constraints -->
<!--   - Quality Constraints -->

<!-- - One way to ensure $\Omega$ is desirable is to enforce qualities by construction -->
<!--   - E.g. grammars -->
<!--   - We can still leverage this formalism if the technique is parameterized with weights/probabilities  -->


<!-- </v-clicks> -->

<!-- --- -->

# An example of our Bayesian formulation of PCG

<div class="absolute top-0 right-0 h-35 w-30 ...">
<img src="/imgs/posterqr.png" class="content-center" /> 
</div>


<HelloWorld valid="true" quality="true"/>

<!-- --- -->
<!-- class: medium -->
<!-- --- -->

<!-- # P -->

<!-- <div class="absolute top-0 right-0 h-35 w-30 ..."> -->
<!-- <img src="imgs/posterqr.png" class="content-center" />  -->
<!-- </div> -->



<!-- $$ P(V \vert Q) = \frac{P(V)P(Q \vert V)}{P(Q)}$$ -->

<!-- where $P(Q \vert V)$ is the probability of generating a quality artifact given it has generated a valid artifact. -->


---
layout: cover
class: rand
---
# Probabilistic Logic Programming

<div class="absolute top-0 right-0 h-35 w-30 ...">
<img src="/imgs/posterqr.png" class="content-center" />
</div>


<v-clicks>

- Probabilistic Logic Semantics give declarative semantics over distribution over possible (logic) models
- Defining the validity/playability is explicitly Bayesian
- Allows for integration of multiple ways of specifying quality/desirable artifacts.
  - Explicitly by observing (Bayesian conditioning on) certain facts
  - Via Learning of parameters from (possible partial) variable instantiations
  - Via Deep Learning ala Scallop or Deep Problog

</v-clicks>

<!-- --- -->

<!-- # Maze Generation Experiment -->

<!-- <div class="absolute top-0 right-0 h-35 w-30 ..."> -->
<!-- <img src="imgs/posterqr.png" class="content-center" />  -->
<!-- </div> -->


<!-- - Generated 1000 mazes using both Answer Set Programming and Problog -->
<!-- - Measured the out mazes by hashing the output mazes and capturing metrics proposed by \cite{}  -->

<!-- //make vega viz for the data -->

<!-- <p style='font-size:6.5pt'> -->
<!--     Michael Coblenz, Gauri Kambhatla, Paulette Koronkevich, Jenna L. Wise, Celeste Barnaby, Joshua Sunshine, Jonathan Aldrich, and Brad A. Myers. 2021. PLIERS: A Process that Integrates User-Centered Methods into Programming Language Design. ACM Trans. Comput.-Hum. Interact. 28, 4, Article 28 (August 2021), 53 pages. https://doi.org/10.1145/3452379 -->
<!-- </p> -->


