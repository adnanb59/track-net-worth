package com.adnan.networth.objs;

import java.util.HashMap;
import javax.persistence.*;

@Entity
public class Property {
    @Id
    public final String type;
    public HashMap<String, Resource> resources;
    private double total;

    public Property() {
        this.type = "";
    };

    public Property(String t) {
        this.type = t;
        this.total = 0;
        this.resources = new HashMap<String, Resource>();
    }

    public void addResource(Resource r) {
        this.resources.put(r.key, r);
        this.total += r.getTotal();
    }

    public void deleteResource(String s) {
        this.total -= this.resources.get(s).getTotal();
        this.resources.remove(s);
    }

    public void updateTotal(double v) {
        this.total += v;
    }
}
