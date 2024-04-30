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
