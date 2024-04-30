pragma circom 2.1.6;

include "../node_modules/circomlib/circuits/comparators.circom";

template Average(n) {
    signal input in[n];
    signal denominator_inverse; 
    signal output out;

    var sum;
    for(var i = 0; i < n; i++) {
        sum += in[i];
    }

    denominator_inverse <-- 1/n;

    component eq = IsEqual();
    eq.in[0] <== 1;
    eq.in[1] <== denominator_inverse * n;

    1 === eq.out;

    out <== sum * denominator_inverse;
}

component main  = Average(5);