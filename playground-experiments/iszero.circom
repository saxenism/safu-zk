pragma circom 2.1.6;

template isZero() {
    // It's convention to name the input signals as in and output signal as out
    signal input in;
    signal output out;

    signal inverse;

    // We compute inverse to be either 0 or 1/in outside the R1CS then force inverse to be correct as part of the constraints.
    inverse <-- in != 0 ? 1/in : 0; 

    out <== -in * inverse + 1;
    in * out === 0; // This makes sure either one of these is 0.
}

component main = isZero();