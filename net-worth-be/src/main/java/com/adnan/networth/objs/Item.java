package com.adnan.networth.objs;

import javax.persistence.Embeddable;

@Embeddable
public class Item {
    public final String label;
    public double value;

    public Item(String l, double v) {
        this.label = l;
        this.value = v;
    }

    public void updateItem(double v) {
        this.value = v;
    }

    public boolean equals(Item obj) {
        return obj.label == this.label;
    }
}
