---
slug: encrypted-qap-evaluations
title: Encrypted QAP Evaluations
authors:
  name: Rahul Saxena
  title: Blocksec Researcher
  url: https://twitter.com/saxenism
  image_url: https://pbs.twimg.com/profile_images/1554486619914117126/7QV7CHum_400x400.jpg
tags: [security, qap]
---

+ QAP: Quadratic Arithmetic Programs.
+ QAP is a *system of equations* of univariate polynomials, and their valid solutions result in a single polynomial equality.
  + They are quadratic because they have exactly one polynomial multiplication
+ QAPs (because of their polynomial equality and the Schwartz-Zippel Lemma) allow ZK-Snarks to be **succinct**.

<!--truncate-->

# 3.1 What is the process of arriving at QAPs?

+ Start with a function logic (from any programming language). The function must be bounded.
+ The function logic is converted into a set of polynomial equations via a process called either **flattening** or **arithmetization**.
+ Now, using these flattened equations from the step above (which are of the form `k + c = a * b`), we convert all these equations into an R1CS or the Rank-1 Constraint System.
  + Given a circuit encoded as a rank 1 constraint system, it is quite possible to create a zk-proof of having a witness, albeit not a succinct one. [Here's an article](https://www.rareskills.io/post/r1cs-zkp) on how to do that.
+ But since having succinct proofs is kind of important to us, we now convert the R1CS into another form of representation called *QAP*, which when solved correctly, gives us one single **polynomial equality**.
  + If that polynomial equality holds true for any random point in our prime field, then we can conclusively (and succinctly) say that the prover indeed knows the solution to the initial function logic.
 
# 3.2 What code does this repo contain?

This repo contains a segment of code that takes an R1CS as an example, converts that into QAP and then solves it to get a single polynomial equality, and then does an evaluation of the two sides of the equality with *encrypted field points*.

That's it. 

## Code Sample

The Python code for this concept is here: 

```python

import galois
import numpy as np
import math
import random
from py_ecc.optimized_bn128 import curve_order

# Creating a finite field (Galois field) which is basically Fq where q = 967
GF_bn128 = galois.GF(curve_order)
# print(GF.properties)

######################################

def process_array(array):
    (rows, columns) = array.shape
    for i in range(0, rows):
        for j in range(0, columns):
            if(math.modf(array[i][j])[0] == 0.0):
                if(array[i][j] < 0):
                    value = -(int(array[i][j]))
                    print(value)
                    array[i][j] = GF_bn128(curve_order - value)
            else:
                raise Exception("Fractional values not allowed in the R1CS arrays over prime field", GF_bn128)
    return GF_bn128(array)

######################################

lagrange_x_values = GF_bn128(np.array([1,2,3]))

# These are the default R1CS values of L, R, S and W.
# Later we can take user inputs to create custom R1CS
default_L = GF_bn128(np.array([
    [0,0,1,0,0,0],
    [0,0,0,1,0,0],
    [0,0,0,0,0,4]
]))

default_R = GF_bn128(np.array([
    [0,0,1,0,0,0],
    [0,0,0,1,0,0],
    [0,0,1,0,0,0]
]))

## Cannot do: default_S = process_array(S), because then I get this error message:
# ---> 50 default_S = process_array(S)
#      52 print(GF_bn128(curve_order-1))
#      54 default_W = GF_bn128(np.array([1,199,3,4,9,16]))

# /Users/saxenism/Desktop/ZK-Land/QAP-Evaluation-curveOrder.ipynb Cell 1 line 2
#      19         value = -(int(array[i][j]))
#      20         print(value)
# ---> 21         array[i][j] = GF_bn128(curve_order - value)
#      22 else:
#      23     raise Exception("Fractional values not allowed in the R1CS arrays over prime field", GF_bn128)

# OverflowError: Python int too large to convert to C long

# S = np.array([
#     [0,0,0,0,1,0],
#     [0,0,0,0,0,1],
#     [2,1,0,0,-1,0]
# ], dtype=np.int64)

# default_S = process_array(S)

default_S = GF_bn128(np.array([
    [0,0,0,0,1,0],
    [0,0,0,0,0,1],
    [2,1,0,0, GF_bn128(0) - GF_bn128(1) ,0]
]))

default_W = GF_bn128(np.array([1,199,3,4,9,16]))

###############################################

def reverse_tuple(tuple):
    new_tuple = tuple[::-1]
    return new_tuple

def find_num_columns_in_array(arr):
    shape_tuple = arr.shape
    if(len(shape_tuple) == 2): 
        return shape_tuple[1]
    elif (len(shape_tuple) == 1): 
        return shape_tuple[0]
    else:
        raise Exception("Invalid array passed")
    
def find_num_points_for_lagrange(arr):
    shape_tuple = arr.shape
    return shape_tuple[0]

def convert_column_to_lagrange_polynomial(array, col_num: int):
    required_column = array[ :, col_num: (col_num + 1)].flatten()
    col_polynomial = galois.lagrange_poly(lagrange_x_values, required_column)
    
    if(col_polynomial == 0):
        col_polynomial_array = GF_bn128(np.zeros(find_num_points_for_lagrange(array), dtype = int))
    elif(col_polynomial.coeffs.size < find_num_points_for_lagrange(array)):
        num_zeros_required = find_num_points_for_lagrange(array) - np.asarray(col_polynomial.coeffs).shape[0]
        col_polynomial_array = GF_bn128(np.append(np.zeros(num_zeros_required, dtype=int), (np.asarray(col_polynomial.coeffs))))
    else:
        col_polynomial_array = GF_bn128(np.asarray(col_polynomial.coeffs))
    
    return col_polynomial_array

def convert_arrays_into_poly_arrays(array):
    num_columns = find_num_columns_in_array(array)
    for i in range(num_columns):
        if(i == 0):
            first_arr = convert_column_to_lagrange_polynomial(array, 0)
            poly_arrays = GF_bn128(np.array([first_arr]))
        else:
            poly_arr = convert_column_to_lagrange_polynomial(array, i)
            poly_arrays = GF_bn128(np.append(poly_arrays, poly_arr))

    required_poly_array_shape = reverse_tuple(array.shape)
    return GF_bn128(poly_arrays.reshape(required_poly_array_shape).transpose())

def multiply_poly_arrays_with_witness(array):
    return np.matmul(array, default_W)

###############################################

U = convert_arrays_into_poly_arrays(default_L)
# print(U)

# print("***********")

V = convert_arrays_into_poly_arrays(default_R)
# print(V)

# print("***********")

W = convert_arrays_into_poly_arrays(default_S)
# print(W)

# print("***********")

###############################################

Ua = multiply_poly_arrays_with_witness(U)
Va = multiply_poly_arrays_with_witness(V)
Wa = multiply_poly_arrays_with_witness(W)

# print(Ua)
# print("***********")
# print(Va)
# print("***********")
# print(Wa)

###############################################
## Introducing t(x) and h(x)

def negateGF967(num):
    return GF_bn128(0) - GF_bn128(num)

a = galois.Poly(Ua, GF_bn128)
b = galois.Poly(Va, GF_bn128)
c = galois.Poly(Wa, GF_bn128)
t = galois.Poly(GF_bn128(np.array([1, negateGF967(1)])), GF_bn128) * galois.Poly(GF_bn128(np.array([1, negateGF967(2)])), GF_bn128) * galois.Poly(GF_bn128(np.array([1, negateGF967(3)])), GF_bn128)

print("a: ", a)
print("b: ", b)
print("c: ", c)
print("t: ", t)

h = ((a * b) - c ) // t

print("h: ", h) 

############################################################################################################
## Introducing tau
## Assume this is generated in a trusted setup and both the prover and verifier are unaware of it's value

tau = random.randrange(1000)
print("Tau: ", tau)

## Non-encrypted evaluation

LHS = a(tau) * b(tau)
print(LHS)

RHS = c(tau) + h(tau) * t(tau)
print(RHS)

if(LHS == RHS):
    print("Congratulations!!")
else:
    print("Lmeow, fuck you, you cheat!!")

######################################
```

> a:  10944121435919637611123202872628637544274182200208017171849102093287904247838x^2 + 10944121435919637611123202872628637544274182200208017171849102093287904247721x + 61

> b:  21888242871839275222246405745257275088548364400416034343698204186575808495616x^2 + 4x

> c:  10944121435919637611123202872628637544274182200208017171849102093287904247893x^2 + 10944121435919637611123202872628637544274182200208017171849102093287904247562x + 171

> t:  x^3 + 21888242871839275222246405745257275088548364400416034343698204186575808495611x^2 + 11x + 21888242871839275222246405745257275088548364400416034343698204186575808495611

> h:  10944121435919637611123202872628637544274182200208017171849102093287904247779x + 10944121435919637611123202872628637544274182200208017171849102093287904247837

> Tau:  547

> 21888242871839275222246405745257275088548364400416034343698204183968301531473

> 21888242871839275222246405745257275088548364400416034343698204183968301531473

> Congratulations!!


```python

###############################################################################
## Encrypted Polynomial Evaluation in the prime field of bn128.curve_order

from py_ecc.bn128 import G1, G2, pairing, multiply, add, eq

tau_encrypted = random.randrange(1, 100000000000000000000000000)
print(tau_encrypted)

tau0 = tau ** 0
tau1 = tau ** 1
tau2 = tau ** 2

tau_0_g1 = multiply(G1, tau0)
tau_1_g1 = multiply(G1, tau1)
tau_2_g1 = multiply(G1, tau2)

tau_0_g2 = multiply(G2, tau0)
tau_1_g2 = multiply(G2, tau1)
tau_2_g2 = multiply(G2, tau2)

encrypted_g1_points = [tau_2_g1, tau_1_g1, tau_0_g1]
encrypted_g2_points = [tau_2_g2, tau_1_g2, tau_0_g2]
 

print(a.coeffs)
a1 = multiply(encrypted_g1_points[0], int(a.coeffs[0]))
a2 = multiply(encrypted_g1_points[1], int(a.coeffs[1]))
a3 = multiply(encrypted_g1_points[2], int(a.coeffs[2]))

a_final = add(a1,(add(a2, a3)))

print(a_final)

###########################################################
## Evaluating polynomial `b` at encrypted tau

print(b.coeffs)

b_1 = multiply(encrypted_g2_points[0], int(b.coeffs[0]))
b_2 = multiply(encrypted_g2_points[1], int(b.coeffs[1]))
b_3 = multiply(encrypted_g2_points[2], int(b.coeffs[2]))

if(eq(b_3, None)):
    b_final = add(b_1, b_2)
else:
    b_final = add(b_1, add(b_2, b_3))

print(b_final)

print("b_1", b_1)
print("b_2", b_2)
print("b_3", b_3)

###########################################################
## Evaluating polynomial `c` at encrypted tau

# print(c.coeffs)

c_1 = multiply(encrypted_g1_points[0], int(c.coeffs[0]))
c_2 = multiply(encrypted_g1_points[1], int(c.coeffs[1]))
c_3 = multiply(encrypted_g1_points[2], int(c.coeffs[2]))

c_final = add(c_1, add(c_2, c_3))

print("c_final: ", c_final)

############################################################
## Evaluating polynomial h(x)t(x) at encrypted tau

print(t.coeffs)
print(h.coeffs)

t_at_tau = t(tau)
t_1_mul = GF_bn128(tau1) * GF_bn128(t_at_tau)
t_2_mul = GF_bn128(tau0) * GF_bn128(t_at_tau)

t_1 = multiply(G1, int(t_1_mul))
t_2 = multiply(G1, int(t_2_mul))

ht_1 = multiply(t_1, int(h.coeffs[0]))
ht_2 = multiply(t_2, int(h.coeffs[1]))

ht_final = add(ht_1, ht_2)

print("t(tau): ", t_at_tau)
print("ht_final: ", ht_final)

###############################################################
## Final evaluation: Pairing the two points on either sides

c_dash = add(c_final, ht_final)

print("c' : ", c_dash)

```

> 64098027294972518179234673
[10944121435919637611123202872628637544274182200208017171849102093287904247838
 10944121435919637611123202872628637544274182200208017171849102093287904247721
                                                                            61]
(12982288392726982225351733373780485305689254297838013319451303210079596783578, 16261839010493893530406620868027587658402847883170388847272802436702387669871)
[21888242871839275222246405745257275088548364400416034343698204186575808495616
                                                                             4
                                                                             0]
((2624918335793398345529053758365003078953687144620727900278007499075773378076, 9872959766140685708079948292341132245193835331941928675796282476798647275935), (15431922025551336443033589763904384291514367502664363698964691749909211325746, 16098043668701872279407050851923101510600492530668835269157507645847881738802))
b_1 ((19649577061300888939940780794193275465824828961870958541914636727523999438201, 3768478345074449006357664587434914347493158600975026659112591142178159686629), (18313830469704994532222459772222443504291118110844470330138826764916740211001, 509758450745406063879129758787092243819554650630097495311522812294761622502))
b_2 ((15970769452536708870740916401890338541924517031822821239345196209789841383918, 5449316838307908179215249249894250109549888881532656454062396660192563597237), (21244656315209568568140611285772764049028070945827395638641193885471330125858, 15985595873672642138325858631843976429366431904744417784226307506893875239283))
b_3 None
c_final:  (19177336333557498595132631543026208127030130399892452897021262662366838262669, 11641764461004233842885829041226156161721570863901337403351942772341357486103)
[                                                                            1
 21888242871839275222246405745257275088548364400416034343698204186575808495611
                                                                            11
 21888242871839275222246405745257275088548364400416034343698204186575808495611]
[10944121435919637611123202872628637544274182200208017171849102093287904247779
 10944121435919637611123202872628637544274182200208017171849102093287904247837]
t(tau):  161878080
ht_final:  (12307269452436295151632145434317373276742571897603573509766109035423261024818, 17988505353712847376720454893818936984967455726464742763048778279490716367378)
c' :  (16516676921569629377665139289779992181117184088063570412633793975894681375200, 15754197829583917595536324646379356523165302722156868083536031271254773702551)

```python
######################################################
## Final block: Evaluating the polynomial equality

lhs = pairing(b_final, a_final)
rhs = pairing(G2, c_dash)

if(eq(rhs, lhs)):
    print("Yayy!! The proof was correct")
else:
    print("Nope, invalid proof")
```

> Yayy!! The proof was correct

