# safu-zk
A website documenting anything and everything about ZK security

# 0. Resources for General ZK 

0. <a href="https://www.rareskills.io/zk-book" target="_blank"> Rareskill's ZK Book </a>

<details>
  <summary><i>Resource Deets</i></summary>
  <br/>
  <p>This ZK Books starts from the very beginning and covers everything that is required to understand the Groth16 proving algorithm. It covers the following topics (in details) with ample examples: </p>
  <ul>
    <li>Explaining what is a Set, Group, Ring and Field </li>
    <li>Elliptic Curve Addition and Multiplication (Bilinear Pairings) </li>
    <li>What are ZK Circuits? </li>
    <li>Representing ZK Circuits as R1CS and creating ZK Proofs with R1CS</li>
    <li>Converting R1CS to QAP for succintness via Schwartz-Zippel</li>
    <li>QAP evaluation over Elliptic Curve</li>
    <li>Groth16 end-to-end explanation</li>
    <li>Intro to Circom and Circomlib</li>
  </ul>
</details>

# 1. Resources for ZK Security

0. <a href="https://github.com/0xPARC/zk-bug-tracker" target="_blank"> 0xParc's ZK Bug Tracker </a>
1. <a href="https://github.com/nullity00/zk-security-reviews" target="_blank"> Nullity's ZK Audits' Repo </a>

# 2. Encrypted QAP Evaluations

+ QAP: Quadratic Arithmetic Programs.
+ QAP is a *system of equations* of univariate polynomials, and their valid solutions result in a single polynomial equality.
  + They are quadratic because they have exactly one polynomial multiplication
+ QAPs (because of their polynomial equality and the Schwartz-Zippel Lemma) allow ZK-Snarks to be **succinct**.

## 2.1 What is the process of arriving at QAPs?

+ Start with a function logic (from any programming language). The function must be bounded.
+ The function logic is converted into a set of polynomial equations via a process called either **flattening** or **arithmetization**.
+ Now, using these flattened equations from the step above (which are of the form `k + c = a * b`), we convert all these equations into an R1CS or the Rank-1 Constraint System.
  + Given a circuit encoded as a rank 1 constraint system, it is quite possible to create a zk-proof of having a witness, albeit not a succinct one. [Here's an article](https://www.rareskills.io/post/r1cs-zkp) on how to do that.
+ But since having succinct proofs is kind of important to us, we now convert the R1CS into another form of representation called *QAP*, which when solved correctly, gives us one single **polynomial equality**.
  + If that polynomial equality holds true for any random point in our prime field, then we can conclusively (and succinctly) say that the prover indeed knows the solution to the initial function logic.
 
## 2.2 What code does this repo contain?

This repo contains a segment of code that takes an R1CS as an example, converts that into QAP and then solves it to get a single polynomial equality, and then does an evaluation of the two sides of the equality with *encrypted field points*.

That's it. 

## Code Sample

The Python code for this concept can be found here: <a href="/code/README.md" target="_blank">Python code</a>
