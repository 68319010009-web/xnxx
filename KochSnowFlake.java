import java.awt.Graphics;
import java.awt.Graphics2D;

import javax.swing.JFrame;


public class KochSnowFlake extends JFrame
{ 
	private static final long serialVersionUID = 1L;

	int num=1;

	public KochSnowFlake()
	{
		setSize(600, 600);
		setDefaultCloseOperation(EXIT_ON_CLOSE);
		setVisible(true);
		
		Thread t= new Thread(new Runnable()
		{
			@Override
			public void run()
			{
				while(true)
				{
					for(int i=1;i<= 10;i++)
					{
						try
						{
							Thread.sleep(6000 );
						} catch (InterruptedException e)
						{
							// TODO Auto-generated catch block
							e.printStackTrace();
						}
						num=i;
						
						repaint();
						
					}
				}
				
			}
		});
		t.start();
		
	}

	public void paint(Graphics g)
	{
		super.paint(g);
		Graphics2D gg=(Graphics2D)g;
		
		Vector now= new Vector(getWidth() / 5.0, getHeight()/3.0*2.0);
		Vector dir_with_size= new Vector(getWidth() /5.0*3.0, 0);
		dir_with_size= dir_with_size.rotate(Math.PI/3);
		createSnowFlake( gg ,  now, dir_with_size, num);
		
		now= now.add(dir_with_size);
		dir_with_size= dir_with_size.rotate(-Math.PI/3*2);
		createSnowFlake( gg ,  now, dir_with_size, num);
		
		now= now.add(dir_with_size);
		dir_with_size= dir_with_size.rotate(-Math.PI/3*2);
		createSnowFlake( gg ,  now, dir_with_size, num);
		
	}
	public void createSnowFlake(Graphics2D g , Vector now,Vector dir_with_size,int n)
	{
		if(n==0) return;
		
		if(n==1)
		{
			Vector a,d;
			a = now;
			d = dir_with_size.add(now);
			g.drawLine((int)a.x,(int)a.y, (int)d.x,(int)d.y);
			return;
		}
		Vector a,b,c,d;
		a = now;
		b = dir_with_size.mul(1.0/3.0).add(now);
		
		c = dir_with_size.mul(2.0/3.0).add(now);
		d = dir_with_size.mul(1).add(now);
		
		
		Vector dir_with_size2= dir_with_size.rotate(Math.PI /3.0).mul(1.0/3.0);
		Vector start3 = dir_with_size2.add(b);
		Vector dir_with_size3= c.sub(start3)  ;

		createSnowFlake( g ,  b, dir_with_size2, n-1);
		createSnowFlake( g ,  start3, dir_with_size3, n-1);

		createSnowFlake( g ,  a, dir_with_size.mul(1.0/3.0), n-1);
		createSnowFlake( g ,  c, dir_with_size.mul(1.0/3.0), n-1);
		
	}
	
	public static void main(String[] args)
	{
		new KochSnowFlake();

	}

}


class Vector
{
	public double x,y;
	public Vector(){}
	public Vector (double xx,double yy)
	{
		x=xx;
		y=yy;
	}
	public Vector rotate(double angle)
	{
		double xx,yy;
		double c = Math.cos(angle);
		double s = Math.sin(angle);
		
		xx = x*c + y*s;
		yy = -x*s + y*c;
		
		
		return new Vector(xx,yy);
	}
	
	public Vector mul(double m)
	{
		return new Vector(x*m,y*m);
	}
	
	public Vector add(Vector v)
	{
		return new Vector(x+v.x,y+v.y);
	}
	public Vector sub(Vector v)
	{
		return new Vector(x-v.x,y-v.y);
	}
}