=IF(arrayX[1]=0;arrayX[1]+totalLength/10;
IF(AND(Math.abs(arrayX[1]-L1)<=totalLength/10;arrayX[1]-L1<0);L1;
IF(AND(arrayX[1]<L1;arrayX[1]!=R1/w;arrayX[0]!=R1/w;abs(arrayX[1]-R1/w)<=totalLength/10);R1/w;
IF(Math.abs(arrayX[1]-totalLength)<totalLength/10;totalLength;
IF(AND(arrayX[1]>L1;arrayX[1]!=totalLength-(R3/w);arrayX[0]!=totalLength-(R3/w);abs(arrayX[1]-(totalLength-(R3/w)))<totalLength/10);totalLength-(R3/w);
IF(OR(arrayX[1]=R1/w;arrayX[1]=totalLength-(R3/w));arrayX[0]+totalLength/10;arrayX[1]+totalLength/10))))))


for(arrayX )
{
    if (arrayX[[1]]=0)
    {
        arrayX[2] = arrayX[[1]]+ (totalLength/10);
    }
    else if (Math.abs(arrayX[[1]]-L1)<= (totalLength/10) && ((arrayX[[1]]-L1)<0))
    {
        arrayX[2] = L1;
    }
    else if ((arrayX[[1]]<L1) && (arrayX[[1]] != R1/w) && (arrayX[0] != R1/w) && (Math.abs(arrayX[[1]]-R1/w) <= (totalLength/10)) )
    {
        arrayX[2] = R1/w;
    }
    else if (Math.abs(arrayX[[1]] - totalLength) < (totalLength / 10))
    {
        arrayX[2] = totalLength;
    }
    else if ((arrayX[[1]] > L1) && ( arrayX[[1]] != (totalLength-(R3/w))) && (arrayX[0] != (totalLength-(R3/w))) && ( abs(arrayX[[1]]-(totalLength-(R3/w))) < (totalLength/10)))
    {
        arrayX[2] = totalLength - (R3 / w);
    }
    else if ( (arrayX[[1]] == R1/w) || (arrayX[[1]] == totalLength - (R3/w) ))
    {
        arrayX[2] = arrayX[0] + (totalLength / 10);
    }
    else
    {
        arrayX[2] = arrayX[[1]] + (totalLength/10);
    }

}


if (arrayX[1]=0)
{
    arrayX[2] = arrayX[1]+ (totalLength/10);
}
 else if (Math.abs(arrayX[1]-L1)<= (totalLength/10) && ((arrayX[1]-L1)<0))
{
    arrayX[2] = L1;
}
 else if ((arrayX[1]<L1) && (arrayX[1] != R1/w) && (arrayX[0] != R1/w) && (Math.abs(arrayX[1]-R1/w) <= (totalLength/10)) )
{
    arrayX[2] = R1/w;
}
 else if (Math.abs(arrayX[1] - totalLength) < (totalLength / 10))
{
    arrayX[2] = totalLength;
}
 else if ((arrayX[1] > L1) && ( arrayX[1] != (totalLength-(R3/w))) && (arrayX[0] != (totalLength-(R3/w))) && ( abs(arrayX[1]-(totalLength-(R3/w))) < (totalLength/10)))
{
    arrayX[2] = totalLength - (R3 / w);
}
 else if ( (arrayX[1] == R1/w) || (arrayX[1] == totalLength - (R3/w) ))
{
    arrayX[2] = arrayX[0] + (totalLength / 10);
}
else
{
    arrayX[2] = arrayX[1] + (totalLength/10);
}




if(arrayX[2]=0)
{
    arrayX[3] = arrayX[2]+totalLength/10
}
 else if((Math.abs(arrayX[2]-L1)<=totalLength/10) && (arrayX[2]-L1<0))
{
    arrayX[3] = L1;
}
else if( (arrayX[2]<L1) && (arrayX[2]<> R1/w) && (arrayX[1]<>R1/w) && (Math.abs(arrayX[2]- R1/w) <= totalLength/10) )
{
    arrayX[3] = R1/w;
}
else if(Math.abs(arrayX[2]-totalLength) < totalLength/10 )
{
    arrayX[3] = totalLength;
}
else if( (arrayX[2]>L1) && (arrayX[2] <> totalLength-(R3/w)) && (arrayX[1] <> totalLength-(R3/w)) && (Math.abs(arrayX[2]- (totalLength-(R3/w))) < totalLength/10))
{
    arrayX[3] = totalLength-(R3/w);
}
else if((arrayX[2]=R1/w) || (arrayX[2] == totalLength-(R3/w)))
{
    arrayX[3]= arrayX[1] + totalLength/10;
}
else
{
    arrayX[3] = arrayX[2]+totalLength/10;
}