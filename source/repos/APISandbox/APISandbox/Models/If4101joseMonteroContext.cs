using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace APISandbox.Models;

public partial class If4101joseMonteroContext : DbContext
{
    public If4101joseMonteroContext()
    {
    }

    public If4101joseMonteroContext(DbContextOptions<If4101joseMonteroContext> options)
        : base(options)
    {
    }

    public virtual DbSet<ContactU> ContactUs { get; set; }

    public virtual DbSet<Nationality> Nationalities { get; set; }

    public virtual DbSet<Student> Students { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseSqlServer("Name=DefaultConnection");//modificar esto

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<ContactU>(entity =>
        {
            entity.ToTable("Contact-Us");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.Email).HasMaxLength(50);
            entity.Property(e => e.Message).HasMaxLength(300);
            entity.Property(e => e.Name).HasMaxLength(50);
        });

        modelBuilder.Entity<Nationality>(entity =>
        {
            entity.ToTable("Nationality");

            entity.Property(e => e.Code).HasMaxLength(10);
            entity.Property(e => e.Name).HasMaxLength(30);
        });

        modelBuilder.Entity<Student>(entity =>
        {
            entity.ToTable("Student");

            entity.Property(e => e.Email).HasMaxLength(30);
            entity.Property(e => e.Name).HasMaxLength(30);
            entity.Property(e => e.NationalityId).HasColumnName("Nationality_id");
            entity.Property(e => e.Password).HasMaxLength(30);

            entity.HasOne(d => d.Nationality).WithMany(p => p.Students)
                .HasForeignKey(d => d.NationalityId)
                .HasConstraintName("FK_Student_Nationality");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
