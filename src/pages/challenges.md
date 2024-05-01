---
title: Vulnerable Circuit Challenges
---

# Ghotala Circuits

This section has a collection of a few standard and non-standard circuit implementations that are vulnerable. Figure out how you can break these circuits.

## 1. IsZero
    
  This circuits returns 1 if the input signal *in* is 0 otherwise returns 0 for non-zero values. Figure out how can you break this circuit.

  ```circom
  pragma circom 2.1.6;

  template isZeroUnsafe() {

      signal input in;
      signal output out;

      signal inter <-- in == 0 ? 1 : 0;

      out <== inter;
  }

  component main = isZeroUnsafe();
  ```

### 1.1 IsZero Solution

The solution to this problem was discussed on twitter. Please have a look at the entire thread to understand how people thought about the problem as well.

Solution: [Solution tweet](https://x.com/saxenism/status/1784546740999188833)


## 2. Calculating the Average

  This circuit calculate the average of the `n` numbers that are supplied to it via the input signal array `in[n]`. Something is wrong with this circuit, to be precise a constraint is missing.

  This example is taken from a very well respected Circom source. So, this bug has been out in the wild for quite a while (~9 months). Can you figure out what's wrong here?

  ```circom
  pragma circom 2.1.6;

  include "node_modules/circomlib/circuits/comparators.circom";

  template Average(n) {

      signal input in[n];
      signal denominator_inv;
      signal output out;

      var sum;
      for (var i = 0; i < n; i++) {
          sum += in[i];
      }

      denominator_inv <-- 1 / n;

      component eq = IsEqual();
      eq.in[0] <== 1;
      eq.in[1] <== denominator_inv * n;

      out <== sum * denominator_inv;

  }

  component main  = Average(5);
  ```