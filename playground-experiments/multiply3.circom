pragma circom 2.1.6;

// All constraints should have just 1 multiplication 
// For example something like out <=== a*b*c would fail to compile

template Multiply3() {
    signal input a, b, c;
    signal output out;

    // out <== a*b*c; 
    // The above expression when combined gives the following error:
    // non quadratic constraints are not allowed!
    // So, we restrict ourselves to quadratic constraints

    signal inter;

    inter <== a * b;
    out <== inter * c;
}

component main = Multiply3();